# Slide Style

Scoped CSS that applies only while its slide is current — style one slide (or section) without affecting the rest of the deck.

## Usage

Put a `<style data-slide>` inside a slide:

```html
<article class="slide">
	<style data-slide>
		:root { --accent: rebeccapurple; }
		h1 { font-size: 300%; }
	</style>
	<h1>Big title</h1>
</article>
```

The style is enabled when you're on that slide and disabled otherwise. Place it in a section that contains multiple slides to style all of them.

## Autoload

Autoloads when any `style[data-slide]` element is present.
