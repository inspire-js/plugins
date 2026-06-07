# Slide Style

Scoped CSS that applies only while its slide is current — style one slide (or section) without affecting the rest of the deck.

## Usage

Put a `<style type=slide>` inside a slide:

```html
<article class="slide">
	<style type=slide>
		:root { --accent: rebeccapurple; }
		h1 { font-size: 300%; }
	</style>
	<h1>Big title</h1>
</article>
```

`type=slide` is the trick: the browser ignores a `<style>` whose type isn't CSS, so it **won't apply** until its slide is shown — no flash of other slides' styles, and no `media` hack needed — while editors still **syntax-highlight** it as CSS. The plugin turns it on when you're on the slide and off otherwise.

The style must live inside a `.slide`; styles outside one are ignored.

## Deprecated: `data-slide`

The older `<style data-slide>` form still works but logs a deprecation warning. Switch to `<style type=slide>`.

## Autoload

Autoloads when any `<style type=slide>` (or legacy `<style data-slide>`) element is present.
