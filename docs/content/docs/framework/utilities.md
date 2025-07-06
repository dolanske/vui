# Utilities

VUI offers a set of single-use utility classes

## Visually Hidden

The `.visually-hidden` class hides content visually while keeping it accessible to screen readers.
This is useful for providing additional context or labels for accessibility purposes.

::visually-hidden-example

```vue
<template>
  <Button square varian="fill" icon="ph:menu">
    <span class="visually-hidden">Open navigation menu</span>
  </Button>
</template>
```

::

## Mark (Text Highlighting)

The `mark` element provides highlighted text with a yellow background and inverted text color.
Perfect for emphasizing important information or search results.

::mark-example

```html
<p>This is regular text with <mark>highlighted content</mark> that stands out.</p>
```

::

## Counter

The `.counter` class creates small, rounded badges perfect for displaying counts,
notifications, or status indicators. It auto-expands into a rectangle if more than 2 letters are inside of it.

::counter-utility-example

```vue
<p>
  Inbox <span class="counter">3</span>
</p>

<p>
  Notifications <span class="counter">12</span>
</p>
```

::
