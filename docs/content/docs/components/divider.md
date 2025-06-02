# Divider

A divider component that creates a horizontal or vertical line to separate content. It can be customized with different sizes, thicknesses, and can include content in the middle.

::divider-example

```vue
<script setup>
import { Avatar, Divider, Flex } from '@dolanske/vui'
</script>

<template>
  <Divider />
  <Divider :thickness="5" :size="64" />
  <Flex>
    <span>One</span>
    <Divider vertical :size="16" />
    <span>Two</span>
    <Divider vertical :size="16" />
    <span>Three</span>
  </Flex>
  <Divider>
    <Avatar />
  </Divider>
</template>
```

::

### Props

| Name        | Default | Type                                                                                     |
| ----------- | ------- | ---------------------------------------------------------------------------------------- |
| `thickness` | `1`     | `number` <br> Thickness of the divider line in pixels                                    |
| `size`      | `32`    | `number` `string` <br> Length of the divider (width for horizontal, height for vertical) |
| `vertical`  | `false` | `boolean` <br> Makes the divider vertical instead of horizontal                          |
| `margin`    | `0`     | `string` `number` <br> Margin around the divider (can be any valid CSS margin value)     |

### Slots

| Name      | Accepts | Description                                                                   |
| --------- | ------- | ----------------------------------------------------------------------------- |
| `default` | `any`   | Content to be displayed in the middle of the divider (creates a text divider) |
