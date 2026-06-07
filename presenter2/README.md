# Presenter View (experimental, Presentation API)

An experimental, opt-in alternative to the classic [`presenter`](../presenter)
plugin, built on the [W3C Presentation API](https://developer.mozilla.org/en-US/docs/Web/API/Presentation_API)
instead of `window.open()`. The presenter (controller) asks the browser to
render the deck on a **secondary attached display or Cast device**, and the two
views stay in sync by exchanging messages over a `PresentationConnection`.

It shares all of its presenter UI (speaker notes, next-slide preview, future
delayed items, timing help) with the classic plugin, and is intended to
eventually replace it.

## Why use it

- Picks the secondary display through the browser's own picker — no dragging a
  popup across screens, no popup blockers.
- Can target Cast / AirPlay-style remote displays, not just attached monitors.
- **Auto-reconnects when the presenter view is reloaded**, with no picker and no
  extra keypress, by reattaching to the still-open audience view.

## Enabling

Add the `experimental-presentation-api` class to `<body>`:

```html
<body class="experimental-presentation-api">
```

This **disables the classic `presenter` plugin** for that deck, so the two never
run together. Without the class, the classic window.open presenter loads as
before — that's the fallback wherever the Presentation API isn't available.

## Autoload

Like the classic plugin, this autoloads when speaker notes
(`<details class="notes">`) are found in any slide **and** the
`experimental-presentation-api` class is present on `<body>`.

## Usage

Enter presenter mode by pressing <kbd>Ctrl</kbd> + <kbd>P</kbd>, then pick the
display to present on. This window becomes the Presenter view; the audience view
is rendered on the chosen display. Slide and item navigation (including
`.delayed` items) is synced across the two views.

If you reload the presenter view, it reconnects to the audience view
automatically. To exit, close/stop the presentation from the browser.

## Requirements & limitations

- Needs a browser that supports the Presentation API (Chromium-based) and a
  **secure context** (HTTPS or `localhost`). On unsupported browsers, remove the
  `experimental-presentation-api` class to fall back to the classic presenter.
- Only slide/item navigation is synced, not keyboard or mouse events — interact
  with the presenter view to drive navigation; play videos / open links / run
  live demos on the audience display directly.
