import Inspire from "inspirejs.org";
import { $$ } from "inspirejs.org/util";

export const hasCSS = false;

Inspire.hooks.add("slidechange", env => {
	$$("[data-src]", env.slide).forEach(element => {
		element.src = element.dataset.src;
	});
});
