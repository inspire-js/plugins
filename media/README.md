# Media

Video slides that play automatically when shown, with optional timed annotations.

## Usage

Add `data-video` to a slide:

```html
<article class="slide" data-video="demo.mp4"></article>
```

The video is muted, restarts and plays each time you enter the slide, pauses when you leave, and toggles play/pause on click.

Modifiers:
- `data-times="N"`: play N times, then stop (default: loop once and stop).
- `.looping`: loop indefinitely.
- `.cover`: fill the whole slide (no framing); otherwise the video sits in a `.media-frame`.
- `data-frame-class`: use a custom class instead of `media-frame` for the container.

### Annotations

Overlay captions that appear during a time range:

```html
<div class="annotation" data-time="1000 to 2000">First, click here</div>
```

- `data-time="START to END"` (milliseconds) controls when the annotation is visible.
- `data-pause="MS"` pauses the video when the annotation appears, optionally resuming after `MS`.

## Autoload

Autoloads when a `[data-video]`, `.media-frame`, or `.browser` element is present.
