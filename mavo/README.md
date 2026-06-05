# Mavo

Use [Mavo](https://mavo.io) apps inside your slides — create interactive, data-driven content with plain HTML, no backend.

## Usage

Just author a Mavo app as usual, with an `mv-app` attribute:

```html
<div mv-app="todo" mv-storage="local">
	<property name="task" mv-multiple>…</property>
</div>
```

The plugin loads Mavo's CSS and JS from the CDN (if not already present) and initializes it, re-running after any Inspire imports finish loading.

## Autoload

Autoloads when any `[mv-app]` element is present.
