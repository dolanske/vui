# Carousel

A horizontally scrollable container for displaying a row of items. It supports drag-to-scroll with the mouse, mouse wheel scrolling, keyboard scrolling and scroll shadow indicators. Items placed within the carousel should have a `min-width` set to prevent flex from fitting everything without overflowing.

The vertical mouse wheel scrolls the carousel horizontally only while it can scroll further in that direction. At either end, or without any overflow, the page scrolls normally. When the content overflows, the carousel can be focused and scrolled with the arrow keys.

> When using the Carousel, you should set `:draggable="false"` on child elements to avoid conflicts with the native drag behavior during drag-to-scroll.

::carousel-example{sourcePath="Carousel/Carousel.vue"}

```vue
<script setup>
import { Carousel } from '@dolanske/vui'

const items = Array.from({ length: 12 }, (_, index) => ({ id: index, label: `Item ${index + 1}` }))
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

| Name            | Default    | Type                                                                                                                                    |
| --------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `gap`           | `'s'`      | `xxxs` `xxs` `xs` `s` `m` `l` `xl` `xxl` `xxxl` `number` <br> Controls the spacing between carousel items. Uses Flex gap under the hood |
| `hideScrollbar` | —          | `boolean` <br> Hides the horizontal scrollbar and removes scrollbar gutter padding                                                      |
| `hideShadows`   | —          | `boolean` <br> Hides the left & right scroll shadow indicators                                                                          |
| `snap`          | —          | `boolean` <br> Enables scroll-snap so items snap into place when scrolling stops. Snapping pauses while dragging                        |
| `disableDrag`   | —          | `boolean` <br> Disables drag-to-scroll, keeping wheel, touch and keyboard scrolling. Useful for interactive items                       |
| `controls`      | `false`    | `boolean` <br> Renders previous / next buttons below the carousel                                                                       |
| `label`         | `Carousel` | `string` <br> Accessible name of the carousel region                                                                                    |

### Slots

| Name      | Props | Description                                                  |
| --------- | ----- | ------------------------------------------------------------ |
| `default` | —     | The carousel items. Each child should have a `min-width` set |
