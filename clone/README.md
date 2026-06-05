# Clone

Duplicate the contents of another element into this one — useful for repeating a figure, diagram, or snippet across slides without copy-pasting markup.

## Usage

Add `data-clone` to an element, set to a CSS selector pointing to the source:

```html
<figure id="diagram">…original…</figure>

<!-- Later slide -->
<figure data-clone="#diagram"></figure>
```

The selector is resolved by walking up the DOM from the target, so it can match elements anywhere in an ancestor.
The source's child nodes are copied in, along with any of its attributes the target doesn't already have. Duplicate `id`s in the clone are automatically deduplicated.

## Autoload

Autoloads when any `[data-clone]` element is present.
