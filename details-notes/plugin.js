import Inspire from "@inspirejs/core";
import { create } from "@inspirejs/core/util";

export const hasCSS = true;

for (let details of document.querySelectorAll("details.notes")) {
	let div = document.createElement("div");
	div.append(...details.childNodes);
	details.append(div);
	details.classList.add("docs-icons"); // for docs plugin

	if (!/\b(top|bottom)-(right|left)\b/.test(details.className)) {
		details.classList.add("top-right");
	}

	let summary = details.querySelector("summary");

	if (!summary) {
		create.start(details, `<summary>Notes</summary>`);
	}

	if (Inspire.projector || document.body.classList.contains("presenter")) {
		// Speaker view, let's have the notes open by default
		details.open = true;
	}
}
