import Inspire from "@inspirejs/core";

export const hasCSS = true;

Inspire.hooks.add("init-start", me => {
	// Create timer, if needed
	let duration = document.body.getAttribute("data-duration");

	if (duration > 0) {
		document.body.insertAdjacentHTML(
			"beforeend",
			`<div id="timer" style="transition-duration: ${duration * 60}s;"></div>`,
		);

		// Start the countdown on load — or right away if the plugin loaded after
		// the load event already fired, so a late load isn't missed.
		let start = () => {
			timer.className = "end";

			setTimeout(() => timer.classList.add("overtime"), duration * 60000);
		};

		if (document.readyState === "complete") {
			start();
		}
		else {
			addEventListener("load", start);
		}
	}
});
