# Charts

A collection of simple HTML-based chart components for visualizing data.

---

## Histogram

Displays a series of numeric values as vertical bars scaled relative to the highest value. Supports click interactions, tooltips, and compact or expanded layouts.

::histogram-example{sourcePath="Charts/Histogram.vue"}

```vue
<script setup>
import { Histogram } from '@dolanske/vui'

const data = [4, 9, 6, 2, 8, 5, 7, 3, 10, 1]
</script>

<template>
  <Histogram :data>
    <template #tooltip="{ value }">
      <p>Capacity: {{ value }}</p>
    </template>
  </Histogram>
</template>
```

::

### Props

| Name      | Default | Type                                                                        |
| --------- | ------- | --------------------------------------------------------------------------- |
| `data`    | —       | `number[]` <br> Array of numeric values to render as bars                   |
| `height`  | `32`    | `number` <br> Height of each bar cell in pixels                             |
| `gap`     | `'xs'`  | `xxs` `xs` `s` `m` `l` `xl` `xxl` `xxxl` `number` <br> Spacing between bars |
| `expand`  | `false` | `boolean` <br> Stretches bars to fill the full width of the container       |
| `compact` | `false` | `boolean` <br> Reduces the width of each bar for a denser appearance        |

### Events

If you attach any of these listeners, the component automatically adds hover interactions.

| Name        | Payload         | Description                                        |
| ----------- | --------------- | -------------------------------------------------- |
| `cellClick` | `index: number` | Emitted when a bar is clicked, with its data index |
| `click`     | —               | Emitted when clicking the histogram container      |

### Slots

| Name      | Props                            | Description                                      |
| --------- | -------------------------------- | ------------------------------------------------ |
| `tooltip` | `value`, `index`, `highestValue` | Custom tooltip content shown when hovering a bar |
