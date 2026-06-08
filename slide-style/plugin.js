import Inspire from "@inspirejs/core";
import { $$ } from "@inspirejs/core/util";

// One-time migration of the deprecated `<style data-slide>` form to the modern
// `<style type=slide>`, so the rest of the plugin only deals with one shape.
let legacy = $$(".slide style[data-slide]");
if (legacy.length) {
	for (let style of legacy) {
		style.type = "slide";
		style.removeAttribute("data-slide");

		if (style.media === "not all") {
			// The type=slide guard replaces the old media="not all" trick
			style.removeAttribute("media");
		}
	}

	console.warn(
		"[slide-style] `<style data-slide>` is deprecated; use `<style type=slide>` instead.",
		...legacy,
	);
}

// Styles currently switched on, tracked so we can switch them off on the next
// slide change — once active their type is "", so they can't be re-found by selector.
let active = [];

/**
 * Apply only the current slide's scoped styles. The browser ignores a <style>
 * whose type isn't CSS, so `type=slide` keeps it inert (no flash, no media hack)
 * while editors still highlight it as CSS; we switch it on with type="".
 * @param {HTMLElement} slide The current slide
 */
function update (slide) {
	for (let style of active) {
		style.type = "slide";
	}

	active = $$("style[type='slide']", slide);

	for (let style of active) {
		style.type = "";
	}
}

// The current slide's slidechange may have already fired before this plugin
// loaded, so the hook below would miss it — run it directly in that case.
// `Inspire.slide !== undefined` means the initial slide change already happened.
if (Inspire.slide !== undefined) {
	update(Inspire.currentSlide);
}

Inspire.hooks.add("slidechange", env => update(env.slide));

// Shared observer: a delayed style waits here for its step's class changes.
let classObserver;
let delayedStyles = [];

/**
 * `type="slide delayed"` folds a style into the slide's step flow: switched on when
 * its step is reached and kept on for the rest of the slide; `transient` keeps it on
 * only while its own step is current. The mirror of slide-script's `runSlideScript`,
 * but a style holds state rather than running once, so this re-applies on every
 * change (its keywords live in `type` while off, stashed in `data-type` while on).
 * @param {HTMLStyleElement} style
 */
function applyStyle (style) {
	let raw = style.type.startsWith("slide") ? style.type : style.dataset.type;
	let transient = raw.includes("transient");

	// `.current:not(.displayed)` is the live current step — core can leave a stale
	// `.current` on items you stepped past then jumped away from; this ignores it.
	let on =
		style.closest(".slide") === Inspire.currentSlide &&
		style.matches(transient ? ".current:not(.displayed)" : ".current, .displayed");

	if (on && style.type !== "") {
		style.dataset.type = style.type;
		style.type = "";
	}
	else if (!on && style.type === "") {
		style.type = style.dataset.type;
	}
}

Inspire.hooks.add("slidechange", ({ slide }) => {
	for (let style of slide.querySelectorAll("style[type~=slide]:not(.delayed)")) {
		if (!style.type.includes("delayed")) {
			continue;
		}

		// Tag `.delayed` (before core counts steps) so it counts as a step.
		style.classList.add("delayed");
		(classObserver ??= new MutationObserver(mutations => {
			for (let { target } of mutations) {
				applyStyle(target);
			}
		})).observe(style, { attributeFilter: ["class"] });
		delayedStyles.push(style);
	}

	// Re-apply all, including ones on the slide we just left, to switch them off:
	// leaving doesn't mutate a slide's classes, so the observer won't fire for them.
	delayedStyles.forEach(applyStyle);
});
