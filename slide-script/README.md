# Slide Script

Run JavaScript when a slide is first shown — for per-slide setup like wiring up a demo, starting an animation, or initializing a widget.

## Usage

Put your code in a `<script type=slide>` inside the slide:

```html
<article class="slide">
	<h1>My demo</h1>
	<button id="go">Go</button>
	<script type=slide>
		document.currentScript.closest(".slide")
			.querySelector("#go")
			.addEventListener("click", () => alert("Hello!"));
	</script>
</article>
```

The `type=slide` is the trick: the browser doesn't recognize the type, so it **won't auto-run** the script at page load — but editors still **syntax-highlight** the contents as JavaScript. The plugin runs it for you when you navigate to the slide.

Tips:

- Use `Inspire.currentSlide` to access the current slide.

- By default each script runs **once**, the first time its slide is shown. Add `always` (`type="slide always"`) to run it **every** time the slide becomes current.
- Scripts run as **classic** scripts by default. Add `module` (`type="slide module"`) to run as an ES module instead.

Keywords combine, in any order, as long as `slide` is first: `type="slide module always"`.

## Autoload

Autoloads when any `script[type=slide]` element is present.
