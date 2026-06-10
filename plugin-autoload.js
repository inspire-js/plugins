/**
 * Plugin registry that maps plugins to selectors that will auto-load them.
 * Each entry's loader imports the plugin's `plugin.js` as a static string literal
 * (not `import(`./${id}/plugin.js`)`), so import-map/bundler tooling can trace the
 * plugin's dependencies; it runs only on a selector match, so nothing loads eagerly.
 * Any dependencies are managed by the plugin itself.
 */
export default {
	timer: { test: "[data-duration]", load: () => import("./timer/plugin.js") },
	presenter: { test: "details.notes", load: () => import("./presenter/plugin.js") },
	"lazy-load": { test: "[data-src]:not(.slide)", load: () => import("./lazy-load/plugin.js") },
	"slide-style": {
		test: "style[type~='slide'], style[data-slide]",
		load: () => import("./slide-style/plugin.js"),
	},
	"slide-script": {
		test: "script[type~='slide']",
		load: () => import("./slide-script/plugin.js"),
	},
	overview: { test: "*", load: () => import("./overview/plugin.js") },
	iframe: {
		test: ".slide[data-src], .iframe.slide, iframe[data-src]",
		load: () => import("./iframe/plugin.js"),
	},
	prism: {
		test: "[class*='lang-'], [class*='language-']",
		load: () => import("./prism/plugin.js"),
	},
	media: { test: "[data-video]", load: () => import("./media/plugin.js") },
	"live-demo": { test: ".demo.slide", load: () => import("./live-demo/plugin.js") },
	resolution: { test: "[data-resolution]", load: () => import("./resolution/plugin.js") },
	docs: {
		test: `code.property, .property code,
				code.css, .css code,
				code.function, .function code,
				code.element, .element code,
				code.attribute, .attribute code,
				code[data-mdn], [data-mdn] code`,
		load: () => import("./docs/plugin.js"),
	},
	mavo: { test: "[mv-app]", load: () => import("./mavo/plugin.js") },
	"visible-keys": {
		test: "[data-visible-keys]",
		load: () => import("./visible-keys/plugin.js"),
	},
	"grid-layouts": { test: "[class*='heading-']", load: () => import("./grid-layouts/plugin.js") },
	"details-notes": { test: "details.notes", load: () => import("./details-notes/plugin.js") },
	markdown: { test: "[data-markdown-elements]", load: () => import("./markdown/plugin.js") },
	"delayed-actions": {
		test: "inspire-action",
		load: () => import("./delayed-actions/plugin.js"),
	},
	clone: { test: "[data-clone]", load: () => import("./clone/plugin.js") },
};
