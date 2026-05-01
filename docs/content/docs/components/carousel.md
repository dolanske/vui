# Carousel

A horizontally scrollable container for displaying a row of items. It supports drag-to-scroll, mouse wheel scrolling, and scroll shadow indicators. Items placed within the carousel should have a `min-width` set to prevent flex from fitting everything without overflowing.

> When using the Carousel, you should set `:draggable="false"` on child elements to avoid conflicts with the native drag behavior during drag-to-scroll.

::carousel-example

```vue
<script setup>
import { Carousel } from '@dolanske/vui'
</script>

<template>
  <Carousel hide-scrollbar>
    <div
      v-for="item in items"
      :key="item.id"
      :draggable="false"
      style="min-width: 120px; height: 80px;"
    >
      {{ item.label }}
    </div>
  </Carousel>
</template>
```

::

### Props

| Name            | Default | Type                                                                                                                             |
| --------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `gap`           | `'s'`   | `xxs` `xs` `s` `m` `l` `xl` `xxl` `xxxl` `number` <br> Controls the spacing between carousel items. Uses Flex gap under the hood |
| `hideScrollbar` | —       | `boolean` <br> Hides the horizontal scrollbar and removes scrollbar gutter padding                                               |
| `hideShadows`   | —       | `boolean` <br> Hides the left & right scroll shadow indicators                                                                   |

### Slots

| Name      | Props | Description                                                  |
| --------- | ----- | ------------------------------------------------------------ |
| `default` | —     | The carousel items. Each child should have a `min-width` set |

### Features

- **Drag to scroll** — Click and drag horizontally to scroll through items. A threshold prevents accidental drags from triggering on simple clicks.
- **Wheel scrolling** — Vertical mouse wheel input is converted to horizontal scrolling within the carousel.
- **Scroll shadows** — Gradient shadow indicators appear on the left and right edges when there is more content to scroll to in that direction.
