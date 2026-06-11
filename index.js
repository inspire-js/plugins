import { registry } from "@inspirejs/core";
import selectors from "./plugin-autoload.js";

/**
 * Populate the core's (empty) plugin registry with this package's plugins.
 * Each entry carries `base` so the core's loader can resolve the plugin's files
 * (plugin.js / plugin.css) relative to this package, wherever it's served from.
 *
 * The core does the actual loading during its setup() — we just register here.
 * Registration is synchronous at import time, and the core loads after an await
 * in setup(), so entries are always in place by the time it loads (as long as
 * this package is in the deck's module graph).
 *
 * Down the line, individual plugins can register their own entries — possibly
 * from separate repos — and this central list will shrink.
 */
const base = new URL("./", import.meta.url);

for (let id in selectors) {
	let { test, load } = selectors[id];
	registry[id] = { test, load, base };
}
