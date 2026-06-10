import Inspire from "@inspirejs/core";

Inspire.hooks.add("init-start", me => {
	// Create timer, if needed
	let duration = document.body.getAttribute("data-duration");

	if (duration > 0) {
		document.body.insertAdjacentHTML(
			"beforeend",
			`<div id="timer" style="transition-duration: ${duration * 60}s;"></div>`,
		);

		addEventListener("load", evt => {
			timer.className = "end";

			setTimeout(() => timer.classList.add("overtime"), duration * 60000);
		});
	}
});
