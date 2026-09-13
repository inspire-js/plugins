# Delayed Actions

A delayed item (revealed with the rest of your incremental items) that, instead of just appearing, **triggers an action** when it becomes current — e.g. clicks a button, plays a video, or fires any event on another element.

## Usage

Use the `<inspire-action>` custom element inside a slide:

```html
<inspire-action target="#play-button"></inspire-action>
```

When you advance to this item, it dispatches an event on the first element matching `target` (searched within the slide).

Attributes:
- `target` (required): CSS selector of the element to act on.
- `type`: event to dispatch (default `click`).
- `once`: only ever trigger once, even if you navigate back and forth.

Like any delayed item, it's stepped through in sequence with your other `.delayed` content. Under the hood it is a plain `.delayed` item that reacts to its own `itemchange` event; `delayed:script` on any element does the same for arbitrary code.

## Autoload

Autoloads when any `<inspire-action>` element is present.
