# Timer

A progress bar that tracks how far you are through your allotted talk time, so you can pace yourself at a glance.

## Usage

Set the talk duration in minutes via `data-duration` on `<body>`:

```html
<body data-duration="20">
```

A bar appears that fills over the duration and switches to an `overtime` state once you run past it.

## Autoload

Autoloads when `<body>` has a `data-duration` attribute.
