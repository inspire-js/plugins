import Inspire from "@inspirejs/core";
import { $$ } from "@inspirejs/core/util";

/**
 * Enable the current slide's scoped styles and disable every other slide's.
 * @param {HTMLElement} slide The current slide
 */
function update (slide) {
	$$(".slide:not(:target) style[data-slide]").forEach(style => (style.disabled = true));
	$$("style[data-slide]", slide).forEach(style => {
		if (style.media === "not all") {
			// Used to prevent the style applying before the plugin is loaded
			style.removeAttribute("media");
		}

		style.disabled = false;
	});
}

// The current slide's slidechange may have already fired before this plugin
// loaded, so the hook below would miss it — apply it directly in that case.
// `Inspire.slide !== undefined` means the initial slide change already happened.
if (Inspire.slide !== undefined) {
	update(Inspire.currentSlide);
}

Inspire.hooks.add("slidechange", env => update(env.slide));
