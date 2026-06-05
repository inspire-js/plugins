# Visible Keys

Show keystrokes on screen as you press them — great for live coding or demoing keyboard shortcuts so the audience can follow along.

## Usage

List the keys to display on a slide via `data-visible-keys` (space-separated [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) values):

```html
<article class="slide" data-visible-keys="Tab Enter ArrowDown">
```

When one of those keys is pressed, a `<kbd>` badge appears on the slide and fades out. Modifiers and arrows are rendered as symbols (⌃ ⇧ ⌥ ⌘ ← ↑ → ↓), and modifier combinations are shown together. Typing in a `<textarea>` is ignored.

- `data-visible-keys-delay`: milliseconds before the badge fades (default `600`).

## Autoload

Autoloads when any `[data-visible-keys]` element is present.
