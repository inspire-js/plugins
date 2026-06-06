import Inspire from "@inspirejs/core";

export const hasCSS = false;

/**
 * Run a `<script type=slide>` by cloning it into a real, executable `<script>`
 * and replacing the original with it. The unknown `type` keeps the browser from
 * auto-running the original at load (while editors still highlight its contents
 * as JS); a *fresh* element is what gets executed — re-inserting the original
 * wouldn't, since it was already processed (and skipped) at parse time. The
 * original `type` is stashed on the clone as `data-type` so reruns can find it.
 *
 * Scripts run as classic scripts by default, so `document.currentScript` works
 * (use `.closest(".slide")` to reach the slide). Add `module`
 * (`type="slide module"`) to run as a module instead, which enables `import` but
 * makes `currentScript` null — use `Inspire.currentSlide` there.
 *
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

	clone.textContent = script.textContent;

	script.replaceWith(clone);
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
