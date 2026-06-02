import Inspire from "@inspirejs/core";
import * as util from "@inspirejs/core/util";
import registry from "./plugin-autoload.js";

export { registry };

export let loaded = {};

export const TIMEOUT = 4000;

// Load a single plugin by id. Plugin files live next to this module,
// so URLs resolve relative to it (no import map needed for the plugin's own files).
export function load (id, def = {}) {
	if (loaded[id]) {
		return loaded[id];
	}

	let path = def.path || ".";
	let pluginURL = new URL(`${path}/${id}/plugin.js`, import.meta.url);
	let noCSS = document.querySelector(`.no-css-${id}, .no-${id}-css, .${id}-no-css`);

	let plugin = loaded[id] = {};
	plugin.loading = pluginURL;
	plugin.loadedJS = import(pluginURL).then(module => plugin.module = module);
	plugin.loaded = plugin.loadedJS.then(module => {
		if (!noCSS && module.hasCSS) {
			let pluginCSS = new URL(`${path}/${id}/plugin.css`, import.meta.url);
			plugin.loading = pluginCSS;
			let link = util.create.in(document.head, `<link rel="stylesheet" href="${pluginCSS}">`);
			return new Promise((res, rej) => {
				link.onload = e => res(module);
				link.onerror = rej;
			});
		}

		return module;
	});
	// Resolves to the JS module, but only after CSS has also loaded
	plugin.loaded = util.defer(plugin.loaded);
	plugin.module = plugin.loaded;
	plugin.done = plugin.loaded.finally(_ => {
		plugin.loading = "";
	});

	return plugin;
}

// Load every registered plugin whose selector matches the current document.
export function loadAll (plugins = registry) {
	let ret = [];

	for (let id in plugins) {
		let def = plugins[id];
		let test = def.test || def;

		let doLoad = document.querySelector(test) || document.body.matches(`[data-load-plugins~="${id}"]`);
		let dontLoad = document.body.matches(`.no-${id}, .no-plugins`);

		if (doLoad && !dontLoad) {
			let plugin = load(id, def);
			// plugin.loaded.then(_ => ret.push(plugin));
			plugin.loaded.catch(e => console.error(`Plugin ${id} error:`, e));
			setTimeout(_ => plugin.loaded.reject("Timed out"), TIMEOUT);
			ret.push(plugin.loaded);
		}
	}

	return ret;
}

// Register additional plugins (id → selector or {test, path}) and load any that match.
export function register (plugins) {
	for (let id in plugins) {
		registry[id] = plugins[id];
	}

	loadAll(plugins);
}

/**
 * Bootstrap: attach this package to the core and hook into its setup.
 * The core stays plugin-agnostic — it exposes a "setup" hook during setup()
 * where extensions contribute promises (into Inspire.dependencies) that gate
 * Inspire.ready. We register there to autoload matching plugins.
 *
 * Ordering: we statically import the core, so it (and its setup() call) evaluate
 * before this code. setup() then suspends at `await this.loadImports()` before
 * firing the "setup" hook, so this synchronous registration is always in
 * place by the time the hook runs — as long as this package is in the deck's
 * module graph (imported statically, not lazily after Inspire.ready).
 */
Inspire.plugins = { registry, loaded, TIMEOUT, load, loadAll, register };
Inspire.loadPlugin = load;

Inspire.hooks.add("setup", inspire => {
	inspire.dependencies.push(...loadAll());
});

Inspire.ready.then(() => {
	let ids = Object.keys(loaded);
	console.info("Inspire.js plugins loaded:", ids.length ? ids.join(", ") : "none");
});
