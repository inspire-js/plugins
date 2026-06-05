import Inspire from "@inspirejs/core";
import { enterPresenterView, onPresenterSlidechange } from "../presenter/presenter-ui.js";

export const hasCSS = true;

/**
 * Experimental presenter plugin built on the W3C Presentation API instead of
 * `window.open()`. The presenter (controller) asks the browser to render the
 * deck on a secondary display or Cast device, and the two views stay in sync
 * by exchanging serialized messages over a PresentationConnection.
 *
 * Opt in by adding `class="experimental-presentation-api"` to <body>; doing so
 * also disables the classic `presenter` plugin (see plugin-autoload.js), so the
 * classic window.open presenter is the fallback wherever this isn't supported.
 *
 * The transport-independent presenter UI (notes, next-slide preview, timing) is
 * shared with the classic plugin via ../presenter/presenter-ui.js.
 */

// sessionStorage key holding the live presentation id, used to silently
// reconnect the presenter view after a reload.
const STORAGE_KEY = "inspire-presentation-id";

let transport = null; // { send(message) } while connected, else null
let applyingRemote = false; // guards against echoing a remote update back

const supported = () => "presentation" in navigator && "PresentationRequest" in window;

/** Send a navigation message to the other view, unless we're applying one. */
function sync (message) {
	if (!applyingRemote) {
		transport?.send(message);
	}
}

/** Apply a navigation message received from the other view. */
function applyRemote (message) {
	applyingRemote = true;

	try {
		if (message.type === "goto") {
			Inspire.goto(message.which);
		}
		else if (message.type === "gotoItem") {
			Inspire.gotoItem(message.which);
		}
	}
	finally {
		applyingRemote = false;
	}
}

/**
 * Wire up a PresentationConnection as our transport. `isController` is true on
 * the presenter side (which persists the id so it can reconnect after reload).
 */
function wireConnection (connection, isController) {
	transport = {
		send: message => {
			if (connection.state === "connected") {
				connection.send(JSON.stringify(message));
			}
		},
	};

	connection.addEventListener("message", e => applyRemote(JSON.parse(e.data)));

	let drop = () => {
		transport = null;

		if (isController) {
			sessionStorage.removeItem(STORAGE_KEY);
		}
	};

	connection.addEventListener("close", drop);
	connection.addEventListener("terminate", drop);

	if (isController) {
		sessionStorage.setItem(STORAGE_KEY, connection.id);
	}
}

Inspire.hooks.add({
	"init-end": () => {
		if (navigator.presentation?.receiver) {
			// We are the audience view, rendered on the secondary display
			document.body.classList.add("projector");

			navigator.presentation.receiver.connectionList.then(list => {
				list.connections.forEach(c => wireConnection(c, false));
				list.addEventListener("connectionavailable", e =>
					wireConnection(e.connection, false));
			});
		}
		else if (supported() && sessionStorage.getItem(STORAGE_KEY)) {
			// Presenter view was reloaded: silently reconnect to the still-open
			// audience display (no picker and no user gesture required).
			let id = sessionStorage.getItem(STORAGE_KEY);

			new PresentationRequest([location.href]).reconnect(id)
				.then(connection => {
					enterPresenterView();
					wireConnection(connection, true);
				})
				.catch(() => sessionStorage.removeItem(STORAGE_KEY)); // audience gone
		}
	},
	keyup: env => {
		// Ctrl+P : Open Presenter view
		if (env.letter !== "P" || transport) {
			// Not our shortcut, or we're already presenting
			return;
		}

		if (!supported()) {
			console.warn(
				"[presenter2] The Presentation API is not supported in this browser. " +
				"Remove the `experimental-presentation-api` class to use the classic presenter.",
			);
			return;
		}

		// Switch this window to presenter view
		enterPresenterView();

		// Ask the browser to render the deck on a secondary display. start()
		// must run inside this user gesture (the keypress).
		new PresentationRequest([location.href]).start()
			.then(connection => {
				wireConnection(connection, true);
				window.focus();
			})
			.catch(() => {}); // picker cancelled or no display available
	},
	slidechange: env => {
		// Sync slide navigation. Send the slide id (stable & serializable);
		// env.which may be an Element, which wouldn't survive JSON.
		sync({ type: "goto", which: Inspire.currentSlide.id });

		onPresenterSlidechange();
	},
	"gotoitem-end": env => {
		// Sync slide item navigation
		sync({ type: "gotoItem", which: env.which });
	},
});
