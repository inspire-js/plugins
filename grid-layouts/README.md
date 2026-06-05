# Grid Layouts

Quick multi-column / multi-row slide layouts with a heading on top — handy for comparison slides or galleries.

## Usage

Add a `heading-MxN` class to a slide, where M is columns and N is rows:

```html
<article class="slide heading-3x2">
	<h1>Comparison</h1>
	<div>…</div>
	<div>…</div>
	<!-- … six cells in a 3×2 grid below the heading … -->
</article>
```

The first `<h1>` (or `<header>`) spans the full width as a heading row; the remaining children fill the M×N grid.

- `--columns` / `--rows` are set from the class but can be overridden; `--column-width` / `--row-height` tune track sizing.
- `.no` drops the heading row (grid only).
- Cells get captions from a `title` attribute or a nested `.caption`, and images/videos/iframes are sized to fit (`object-fit: contain`).

## Autoload

Autoloads when any element has a `heading-*` class.
