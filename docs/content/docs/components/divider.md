# Divider

A divider component that creates a horizontal or vertical line to separate content. It can be customized with different sizes, thicknesses, and can include content in the middle.

::divider-example

```vue
<script setup>
import { Divider } from '@dolanske/vui'
</script>

<template>
  <div class="flex flex-col gap-xs">
    <p>Content above</p>
    <Divider />
    <p>Content below</p>
  </div>
</template>
```

::

### Props

| Name        | Default | Type               | Description                                                       |
| ----------- | ------- | ------------------ | ----------------------------------------------------------------- |
| `thickness` | `1`     | `number`           | Thickness of the divider line in pixels                           |
| `size`      | `32`    | `number \| string` | Length of the divider (width for horizontal, height for vertical) |
| `vertical`  | `false` | `boolean`          | Makes the divider vertical instead of horizontal                  |
| `margin`    | `0`     | `string \| number` | Margin around the divider (can be any valid CSS margin value)     |

### Slots

| Name      | Description                                                                   |
| --------- | ----------------------------------------------------------------------------- |
| `default` | Content to be displayed in the middle of the divider (creates a text divider) |

Here's an example of different divider styles:

```vue
<script setup>
import { Divider } from '@dolanske/vui'
</script>

<template>
  <div class="flex flex-col gap-xs">
    <Divider />
    <Divider thickness="2" />
    <Divider>With Text</Divider>
    <div class="flex items-center gap-xs">
      <span>Left</span>
      <Divider vertical size="24" />
      <span>Right</span>
    </div>
  </div>
</template>
```
