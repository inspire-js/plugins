import Inspire from "@inspirejs/core";
import { $$ } from "@inspirejs/core/util";

/**
 * Transport-independent presenter UI, shared between the classic `presenter`
 * plugin (window.open transport) and the experimental `presenter2` plugin
 * (Presentation API transport). Anything here only touches the *local*
 * presenter view, never the audience view, so it works regardless of how the
 * two views are linked.
 */

/**
 * Turn the current window into the presenter view: show the next-slide preview,
 * and open any speaker notes in the current slide.
 */
export function enterPresenterView () {
	document.body.classList.add("presenter", "show-next");
	$$("details.notes", Inspire.currentSlide).forEach(d => (d.open = true));
}

/**
 * Run on every slide change, on the presenter view only. Opens the new slide's
 * speaker notes and, if the slide carries timing hints, computes how far ahead
 * or behind schedule we are (surfaced via `data-offset` / `data-running`).
 */
export function onPresenterSlidechange () {
	if (!document.body.classList.contains("presenter")) {
		// Not the presenter view, nothing to do
		return;
	}

	$$("details.notes", Inspire.currentSlide).forEach(d => (d.open = true));

	if (Inspire.currentSlide.matches("[data-start-time] [data-time]")) {
		// This slide has a time hint, show if we're running behind

		// Scheduled start time
		let startTime = Inspire.currentSlide
			.closest("[data-start-time]")
			?.getAttribute("data-start-time");
		let startTimeParsed = startTime.split(":").map(n => +n);

		// Ideal offset from start time
		let time = Inspire.currentSlide.dataset.time;
		let timeParsed = time.split(":").map(n => +n);

		// Current local time
		let currentTime = new Date().toLocaleString("en", {
			timeStyle: "short",
			hour12: false,
		});
		let currentTimeParsed = currentTime.split(":").map(n => +n);

		// Actual offset from start time, in minutes
		let actualTime =
			(currentTimeParsed[0] - startTimeParsed[0]) * 60 +
			(currentTimeParsed[1] - startTimeParsed[1]);

		let offset = actualTime - (timeParsed[0] * 60 + timeParsed[1]);
		let offsetHours = Math.floor(Math.abs(offset / 60))
			.toString()
			.padStart(2, "0");
		let offsetMinutes = (Math.abs(offset) % 60).toString().padStart(2, "0");

		Inspire.currentSlide.dataset.offset = `${offsetHours}:${offsetMinutes}`;

		if (offset !== 0) {
			Inspire.currentSlide.dataset.running = offset > 0 ? "behind" : "ahead";
		}
	}
}
