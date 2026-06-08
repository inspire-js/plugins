import Inspire from "@inspirejs/core";
import { create } from "@inspirejs/core/util";

export const hasCSS = true;

const css = new URL("./plugin.css", import.meta.url).href;

Inspire.hooks.add("slidechange", ({ slide, firstTime }) => {
	let details = slide.querySelector("details.notes");

	if (!details) {
		return;
	}

	if (firstTime) {
		let div = document.createElement("div");
		div.append(...details.childNodes);
		details.append(div);
		details.classList.add("docs-icons"); // for docs plugin

		if (!/\b(top|bottom)-(right|left)\b/.test(details.className)) {
			details.classList.add("top-right");
		}

		let summary = details.querySelector("summary");

		if (!summary) {
			details.insertAdjacentHTML("afterbegin", "<summary>Notes</summary>");
		}

		// let shadowRoot = slide.shadowRoot || slide.attachShadow({ mode: "open" });
		// shadowRoot.append(details);
		// shadowRoot.adoptedStyleSheets.push(create(css));
	}

	if (Inspire.projector) {
		details.open = true;
	}
});

for (let details of document.querySelectorAll("details.notes")) {
	if (Inspire.projector) {
		// Speaker view, let's have the notes open by default
		details.open = true;
	}
}
