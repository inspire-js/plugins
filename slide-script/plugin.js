import Inspire from "@inspirejs/core";

export const hasCSS = false;

/**
 * Clone a `<script>` into a real, executable one and replace the original with it.
 * A *fresh* element is what runs — re-inserting the original wouldn't, since it was
 * already processed (and skipped) at parse time. On the first run the original
 * `type` is stashed on the clone as `data-type` so reruns can find it.
 * @param {HTMLScriptElement} script
 * @param {Set<string>} params
 * @param {boolean} firstTime Whether `script` is the unrun original (vs. a prior clone)
 */
function runScript (script, params, firstTime) {
	let clone = document.createElement("script");

	for (let name of script.getAttributeNames()) {
		let value = script.getAttribute(name);

		if (name === "type" && firstTime) {
			clone.type = params.has("module") ? "module" : "text/javascript";
			clone.dataset.type = value;
		}
		else {
			clone.setAttribute(name, value);
		}
	}

	// Keep `.delayed` (the clone stays a step) but drop the step-state classes, so a
	// revisited delayed script looks unreached again and waits for its step rather
	// than running on slide entry.
	clone.classList.remove("current", "displayed", "future");
	clone.textContent = script.textContent;

	script.replaceWith(clone);
}

// Shared observer: a delayed script waits here until its step is reached, then runs.
let classObserver;

/**
 * Run a `<script type=slide>`. The unknown `type` keeps the browser from auto-running
 * it at load (while editors still highlight it as JS); we run it ourselves via
 * {@link runScript}. By default each runs once, the first time its slide is shown;
 * `always` runs it every time, `module` runs it as an ES module.
 *
 * `delayed` instead runs it when its step is reached in the slide's incremental flow
 * (the scriptable counterpart to `<inspire-action>`): it's tagged `.delayed` to count
 * as a step, then waits in the shared observer until it becomes current.
 *
 * Scripts run as classic scripts by default, so `document.currentScript` works (use
 * `.closest(".slide")` to reach the slide); modules make `currentScript` null — use
 * `Inspire.currentSlide` there.
 * @param {HTMLScriptElement} script
 */
function runSlideScript (script) {
	// `slide` type means it hasn't run yet; a processed clone carries the original type in data-type
	let firstTime = script.type?.startsWith("slide");
	let rawParams = firstTime ? script.type : script.dataset.type;
	let params = new Set(rawParams.split(/\s+/).slice(1));

	if (!firstTime && !params.has("always")) {
		return;
	}

	if (params.has("delayed")) {
		script.classList.add("delayed");
	}

	if (script.matches(".delayed:not(.current, .displayed)")) {
		// Not stepped to yet: run when it is. The observer re-calls this, which then
		// falls through to the run branch. (Tagging `.delayed` above, before core
		// counts steps, is what makes it count as one.)
		classObserver ??= new MutationObserver(mutations => {
			for (let { target } of mutations) {
				// Run once its step is reached — unless we've since fast-forwarded off
				// the slide (closest() is also null once it's been replaced, so this
				// doubles as a guard against re-running a just-replaced script).
				if (
					target.matches(".current, .displayed") &&
					target.closest(".slide") === Inspire.currentSlide
				) {
					runSlideScript(target);
				}
			}
		});
		classObserver.observe(script, { attributeFilter: ["class"] });
	}
	else {
		runScript(script, params, firstTime);
	}
}

// Matches unprocessed scripts (type="slide …") and the clones we leave behind (data-type="slide …")
const SELECTOR = "script[type^=slide][type~=slide], script[data-type^=slide][data-type~=slide]";

/**
 * Run the current slide's scripts. By default each runs once, the first time the
 * slide is shown; `type="slide always"` runs it every time the slide is current.
 * @param {{ slide: HTMLElement }} [env]
 */
function runSlideScripts ({ slide } = { slide: Inspire.currentSlide }) {
	for (let script of slide.querySelectorAll(SELECTOR)) {
		runSlideScript(script);
	}
}

// The current slide's slidechange may have already fired before this plugin
// loaded, so the hook below would miss it — run it directly in that case.
// `Inspire.slide !== undefined` means the initial slide change already happened.
if (Inspire.slide !== undefined) {
	runSlideScripts();
}

Inspire.hooks.add("slidechange", env => runSlideScripts(env));
