# Divider

A divider component that creates a horizontal or vertical line to separate content. It supports line thickness, style type, and can include content in the middle.

::divider-example

```vue
<script setup>
import { Avatar, Divider, Flex } from '@dolanske/vui'
</script>

<template>
  <Divider />
  <Divider :size="2" type="dashed" />
  <Flex>
    <span>One</span>
    <Divider vertical height="16px" />
    <span>Two</span>
    <Divider vertical height="24px" :size="4" />
    <span>Three</span>
  </Flex>
  <Divider>
    <Avatar />
  </Divider>
</template>
```

::

### Props

| Name       | Default | Type                                                                                    |
| ---------- | ------- | --------------------------------------------------------------------------------------- |
| `size`     | `1`     | `number` `string` <br> Divider line thickness                                           |
| `type`     | `solid` | `'solid' \| 'dashed' \| 'dotted'` <br> Divider line style                               |
| `vertical` | `false` | `boolean` <br> Makes the divider vertical instead of horizontal                         |
| `height`   | `100%`  | `number` `string` <br> Height for a vertical divider. Pass it when `vertical` is `true` |

### Slots

| Name      | Accepts | Description                                                                   |
| --------- | ------- | ----------------------------------------------------------------------------- |
| `default` | `any`   | Content to be displayed in the middle of the divider (creates a text divider) |
