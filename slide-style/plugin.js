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
