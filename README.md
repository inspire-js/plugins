# @inspirejs/plugins

Official plugins for [Inspire.js](https://github.com/inspire-js/inspire.js), the lean, hackable, extensible slide deck framework.

Plugins are **autoloaded on demand**: each one declares a CSS selector, and it only loads if your deck contains a matching element. The package attaches itself to the core when imported and hooks into `Inspire`’s setup — you don’t call anything manually.

## Usage

Initialize plugins by importing the package after the core:

```js
import "inspirejs.org";        // the core engine (auto-initializes)
import "@inspirejs/plugins";   // autoloads any plugins your deck uses
```

Most plugins can be auto-loaded by simply using them or adding an HTML attribute. See the table below for details.

Additionally, after load, the package exposes:

- `Inspire.plugins` — `{ registry, loaded, load, loadAll, register, TIMEOUT }`
- `Inspire.loadPlugin(id)` — load a plugin on demand (loads once)

These should not be necessary in most cases, and are only meant as a low-level API for plugin authors and advanced use cases.

## Included plugins

See [`plugin-autoload.js`](./plugin-autoload.js) for the full list of plugins and their auto-load selectors.

## Including and disabling plugins

- Disable one: add class `no-<id>` to `<body>` (e.g. `no-overview`).
- Disable all: add class `no-plugins` to `<body>`.
- Skip a plugin’s CSS only: class `no-<id>-css` on any element.
- Force-load a plugin even without a match: `data-load-plugins="<id> …"` on `<body>`.

