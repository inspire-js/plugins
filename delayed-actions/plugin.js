/**
 * A delayed item that triggers an action when it becomes current, instead of appearing.
 * It is an ordinary `.delayed` item to the core; it just listens to its own `itemchange`.
 */
export default class InspireAction extends HTMLElement {
	#triggered = 0;
	#current = false;

	constructor () {
		super();

		// Attached once, so re-inserting the element cannot stack up listeners
		this.addEventListener("itemchange", () => {
			// itemchange also fires for descendants and for other items on this element, so the
			// class is the signal — except when it only marks a container of a current item
			let current = this.classList.contains("current") && !this.querySelector(".current");

			if (current !== this.#current) {
				this.#current = current;

				if (current) {
					this.trigger();
				}
			}
		});
	}

	get type () {
		return this.getAttribute("type");
	}

	set type (type) {
		this.setAttribute("type", type);
	}

	get target () {
		return this.getAttribute("target");
	}

	set target (target) {
		this.setAttribute("target", target);
	}

	trigger () {
		if (this.#triggered > 0 && this.hasAttribute("once")) {
			return;
		}

		this.#triggered++;

		let type = this.type || "click";
		let slide = this.closest(".slide");
		let targetSelector = this.target;

		if (!targetSelector) {
			throw new Error("<inspire-action> has no target", { cause: this });
		}

		let target = slide.querySelector(targetSelector);

		if (target) {
			// TODO use correct constructor
			target.dispatchEvent(new Event(type));
		}
	}

	connectedCallback () {
		this.classList.add("delayed");
	}
}

customElements.define("inspire-action", InspireAction);
