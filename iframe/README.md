# Iframe

Embed a live web page as a slide (or anywhere in a slide), loaded lazily when you navigate to it.

## Usage

Make a whole slide an embedded page by adding `data-src` to it:

```html
<article class="slide" data-src="https://example.com"></article>
```

The slide becomes a full-bleed `<iframe>` with a title bar linking to the page. The title is taken from the iframe/slide `title`, `data-title`, or a prettified URL.

- `no-title` class: hide the title bar.
- For an iframe anywhere in a slide, use `<iframe data-src="…">` — its `src` is set on first view.

The page only loads once you reach the slide, so off-screen embeds don't slow down your deck.

## Autoload

Autoloads when a `.slide[data-src]`, `.iframe.slide`, or `iframe[data-src]` is present.
