# Prism

Syntax highlighting via [Prism](https://prismjs.com), loaded on demand — only Prism core and the languages your deck actually uses are fetched.

## Usage

Mark up code blocks with a language class, as usual for Prism:

```html
<pre><code class="language-css">a { color: red }</code></pre>
```

The plugin scans for `lang-*` / `language-*` classes, then loads those languages (resolving dependencies and aliases) and highlights each slide as you reach it.

- `data-prism-plugins="name, …"` on any element: load [Prism plugins](https://prismjs.com/#plugins) (e.g. `normalize-whitespace`).
- `data-prism-root`: override where Prism is loaded from (defaults to prismjs.com, falling back to a CDN).
- `.prism-ignore` on (or around) an element opts it out of highlighting.

## Autoload

Autoloads when any element has a `lang-*` or `language-*` class.
