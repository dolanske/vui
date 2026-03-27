# Carousel

A horizontally scrollable container for displaying a row of items. It supports drag-to-scroll, mouse wheel scrolling, scroll shadow indicators, and an integrated Sheet for showing expanded content. Items placed within the carousel should have a `min-width` set to prevent flex from fitting everything without overflowing.

::carousel-example

```vue
<script setup>
import { Button, Card, Carousel, Flex } from '@dolanske/vui'
</script>

<template>
  <Carousel :sheet-width="400">
    <template #header="{ toggle }">
      <Flex x-between y-center class="mb-s">
        <strong>Featured Albums</strong>
        <Button size="s" plain @click="toggle">
          See all
        </Button>
      </Flex>
    </template>

    <Card
      v-for="album in albums"
      :key="album.title"
      :draggable="false"
      style="min-width: 160px"
    >
      <strong>{{ album.title }}</strong>
      <small>{{ album.artist }}</small>
    </Card>

    <template #sheet-header="{ close }">
      <Flex x-between y-center>
        <h4>All Albums</h4>
        <Button plain size="s" @click="close">
          <IconX />
        </Button>
      </Flex>
    </template>

    <template #sheet-content>
      <p>Full list of albums goes here.</p>
    </template>
  </Carousel>
</template>
```

::

### Important Note

When using the Carousel, you should set `:draggable="false"` on child elements to avoid conflicts with the native drag behavior during drag-to-scroll.

### Props

| Name         | Default | Type                                                                                                 |
| ------------ | ------- | ---------------------------------------------------------------------------------------------------- |
| `gap`        | `'s'`   | `s` `m` `l` `number` <br> Controls the spacing between carousel items. Uses Flex gap under the hood |
| `sheetWidth` | —       | `number` <br> Sets the width of the integrated Sheet panel                                           |

### Events

The Carousel does not emit events directly. The integrated Sheet is controlled internally through the `toggle` function exposed via slot props.

### Slots

| Name            | Props                     | Description                                                                                                          |
| --------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `default`       | —                         | The carousel items. Each child should have a `min-width` set                                                         |
| `header`        | `{ toggle: () => void }`  | Content displayed above the carousel track. Receives `toggle` to open/close the sheet                                |
| `footer`        | `{ toggle: () => void }`  | Content displayed below the carousel track. Receives `toggle` to open/close the sheet                                |
| `sheet-header`  | `{ close: () => void }`   | Header content for the integrated Sheet                                                                              |
| `sheet-content` | —                         | Content for the integrated Sheet. If not provided, the Sheet will display the same content as the default slot        |
| `sheet-footer`  | `{ close: () => void }`   | Footer content for the integrated Sheet                                                                              |

### Features

- **Drag to scroll** — Click and drag horizontally to scroll through items. A threshold prevents accidental drags from triggering on simple clicks.
- **Wheel scrolling** — Vertical mouse wheel input is converted to horizontal scrolling within the carousel.
- **Scroll shadows** — Gradient shadow indicators appear on the left and right edges when there is more content to scroll to in that direction.
- **Integrated Sheet** — A built-in Sheet component can be toggled via the `toggle` function provided to the `header` and `footer` slots, useful for displaying an expanded "See all" view.
