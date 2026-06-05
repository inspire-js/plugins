# Resolution

Author your deck at a fixed virtual resolution and have it scale to fit any screen, so layouts stay pixel-consistent regardless of the display.

## Usage

Add `data-resolution="WIDTH HEIGHT"` to the `<body>` (for the whole deck), a grouping element, or an individual slide:

```html
<body data-resolution="1024 768">
```

The page is zoomed to fit the viewport while preserving the aspect ratio, and re-adjusts on resize. Slides outside any `[data-resolution]` render normally.

## Autoload

Autoloads when any `[data-resolution]` element is present.
