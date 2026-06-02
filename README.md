# @inspirejs/plugins

Official plugins for [Inspire.js](https://github.com/inspire-js/inspire.js), the lean, hackable, extensible slide deck framework.

Plugins are **autoloaded on demand**: each one declares a CSS selector, and it only loads if your deck contains a matching element. The package attaches itself to the core when imported and hooks into `Inspire`’s setup — you don’t call anything manually.

## Install

Inspire.js decks resolve dependencies with [nudeps](https://nudeps.dev) (naked dependencies, no build, no CDN):

```sh
npm install inspirejs.org @inspirejs/plugins
npx nudeps install
```

`nudeps install` copies both packages into `client_modules/` and generates an import map, so the browser can resolve the bare specifiers below.

## Usage

```html
<script src="/importmap.js"></script>
<script type="module">
	import "inspirejs.org";        // the core engine (auto-initializes)
	import "@inspirejs/plugins";   // autoloads any plugins your deck uses
</script>
```

After load, the package exposes:

- `Inspire.plugins` — `{ registry, loaded, load, loadAll, register, TIMEOUT }`
- `Inspire.loadPlugin(id)` — load a plugin on demand (loads once)

```js
await Inspire.loadPlugin("prism");
// ...prism is now loaded
```

## Included plugins

| Plugin | Loads when the deck has… |
|---|---|
| `timer` | `[data-duration]` |
| `presenter` / `details-notes` | `details.notes` |
| `lazy-load` | `[data-src]:not(.slide)` |
| `slide-style` | `style[data-slide]` |
| `overview` | always (use `.no-overview` to opt out) |
| `iframe` | `.slide[data-src]`, `.iframe.slide`, `iframe[data-src]` |
| `prism` | `[class*="lang-"]`, `[class*="language-"]` |
| `media` | `[data-video]`, `.media-frame`, `.browser` |
| `live-demo` | `.demo.slide` |
| `resolution` | `[data-resolution]` |
| `docs` | inline doc references (`code.property`, `[data-mdn]`, …) |
| `mavo` | `[mv-app]` |
| `visible-keys` | `[data-visible-keys]` |
| `grid-layouts` | `[class*="heading-"]` |
| `markdown` | `[data-markdown-elements]` |
| `delayed-actions` | `inspire-action` |
| `clone` | `[data-clone]` |

## Disabling plugins

- Disable one: add class `no-<id>` to `<body>` (e.g. `no-overview`).
- Disable all: add class `no-plugins` to `<body>`.
- Skip a plugin’s CSS only: class `no-<id>-css` on any element.
- Force-load a plugin even without a match: `data-load-plugins="<id> …"` on `<body>`.

## License

MIT © Lea Verou and contributors
