# Markdown

Write slide content in Markdown instead of HTML, in just the elements you choose.

## Usage

List the elements whose content is Markdown via `data-markdown-elements` (a CSS selector) on any element — typically `<body>`:

```html
<body data-markdown-elements=".slide p, details.notes">
```

Matching elements have their content rendered with [markdown-it](https://github.com/markdown-it/markdown-it) (CommonMark + tables, typographer, linkify). Leading indentation is stripped, and single-line content is rendered inline (no wrapping `<p>`).

- `data-markdown-plugins="name, …"`: load markdown-it plugins by npm package name (resolved via [esm.sh](https://esm.sh)) or URL. `markdown-it-attrs` is given special handling for fenced code blocks.
- Elements with a `no-md` class — and `<pre>`, `<code>`, `<script>`, `<style>`, `<svg>` — are skipped.

## Autoload

Autoloads when any `[data-markdown-elements]` element is present.
