# Utilities

VUI offers a set of single-use utility classes

## Visually Hidden

The `.visually-hidden` class hides content visually while keeping it accessible to screen readers.
This is useful for providing additional context or labels for accessibility purposes.

::visually-hidden-example

```vue
<template>
  <Button square varian="fill">
    <template #start>
      <IconNaviagation />
    </template>
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

## Tooltip

VUI provides a CSS-only tooltip system that allows you to quickly add tooltips to any element using data attributes. Simply add a `data-title-{position}` attribute with your tooltip text, and the tooltip will appear on hover.

| Position                  | Description                          | Example                                                              |
| ------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| `data-title-left`         | Tooltip appears to the left          | <span data-title-left="Tooltip on left">Hover me</span>              |
| `data-title-right`        | Tooltip appears to the right         | <span data-title-right="Tooltip on right">Hover me</span>            |
| `data-title-top`          | Tooltip appears above, centered      | <span data-title-top="Tooltip on top">Hover me</span>                |
| `data-title-top-left`     | Tooltip appears above, left-aligned  | <span data-title-top-left="Tooltip top-left">Hover me</span>         |
| `data-title-top-right`    | Tooltip appears above, right-aligned | <span data-title-top-right="Tooltip top-right">Hover me</span>       |
| `data-title-bottom`       | Tooltip appears below, centered      | <span data-title-bottom="Tooltip on bottom">Hover me</span>          |
| `data-title-bottom-left`  | Tooltip appears below, left-aligned  | <span data-title-bottom-left="Tooltip bottom-left">Hover me</span>   |
| `data-title-bottom-right` | Tooltip appears below, right-aligned | <span data-title-bottom-right="Tooltip bottom-right">Hover me</span> |

Note that the tooltips are controlled purely in CSS. There is no overflow / page position calculation. For more advanced cases, use the [Tooltip](/docs/components/tooltip) component.
