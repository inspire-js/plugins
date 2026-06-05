# Details Notes

Turn speaker notes into a small, collapsible box tucked into a corner of the slide, so you can keep notes inline in your deck without them dominating the slide.

## Usage

Add a `<details class="notes">` to any slide:

```html
<article class="slide">
	<h1>My slide</h1>
	<details class="notes">
		<summary>Notes</summary>
		Remember to mention the demo.
	</details>
</article>
```

- A `<summary>` labelled "Notes" is added automatically if you omit one.
- Position with a `top-right` / `top-left` / `bottom-right` / `bottom-left` class (defaults to `top-right`).
- In the [Presenter](../presenter) view, notes open automatically.

## Autoload

Autoloads when any `details.notes` element is present.
