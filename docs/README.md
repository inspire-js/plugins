# Docs

Automatically turn inline `<code>` into links to the relevant [MDN](https://developer.mozilla.org) documentation page, so technical terms in your slides become clickable references.

## Usage

Mark up code with a class (or `data-mdn`) describing what kind of thing it is, and the plugin wraps it in an MDN link:

```html
<code class="element">video</code>     <!-- → MDN HTML element page, rendered as <video> -->
<code class="property">gap</code>       <!-- → MDN CSS property page -->
<code class="function">min</code>        <!-- → MDN CSS function page, rendered as min() -->
<code class="attribute">href</code>      <!-- → MDN HTML attribute page -->
```

Either form works: a class on the `<code>` (`property`, `css`, `function`, `element`, `attribute`) or a class on an ancestor with the `<code>` inside it.

- `element` renders the text wrapped in `<…>`; `function` appends `()`.
- `data-mdn="<path>"` on the code or an ancestor points at an arbitrary MDN path.
- `data-category` (for attributes) and `--docs-markup: svg` (CSS, for SVG elements/attributes) refine the target page.

Links are re-applied to dynamically added content (`inspire-domchanged`).

## Autoload

Autoloads when matching code is present (`code.property`, `.css code`, `code[data-mdn]`, etc. — see [`plugin-autoload.js`](../plugin-autoload.js)).
