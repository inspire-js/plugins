# Lazy Load

Defer loading of heavy resources (images, videos, …) until their slide is actually shown, keeping initial load fast.

## Usage

Put the URL in `data-src` instead of `src`:

```html
<img data-src="huge-diagram.png" alt="…">
```

When you navigate to the slide containing it, the plugin copies `data-src` into `src` and the resource loads.

For embedding whole pages as slides, see the [Iframe](../iframe) plugin instead.

## Autoload

Autoloads when any `[data-src]` element (that isn't itself a slide) is present.
