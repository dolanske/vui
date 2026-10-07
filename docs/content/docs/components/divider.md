# Divider

A divider component that creates a horizontal or vertical line to separate content. It supports line thickness, style type, and can include content in the middle.

::divider-example{sourcePath="Divider/Divider.vue"}

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

| Name       | Default | Type                                                                                                                           |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `size`     | `1`     | `number` `string` <br> Divider line thickness                                                                                  |
| `type`     | `solid` | `'solid' \| 'dashed' \| 'dotted'` <br> Divider line style                                                                      |
| `vertical` | `false` | `boolean` <br> Makes the divider vertical instead of horizontal                                                                |
| `height`   | —       | `number` `string` <br> Height of a vertical divider. Without it, the divider stretches to the height of its flex / grid parent |

The divider is a native `<hr>` separator. Vertical dividers set `aria-orientation="vertical"`.

### Slots

| Name      | Accepts | Description                                                                   |
| --------- | ------- | ----------------------------------------------------------------------------- |
| `default` | `any`   | Content to be displayed in the middle of the divider (creates a text divider) |

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                              | Default                                      | Description              |
| ---------------------------------- | -------------------------------------------- | ------------------------ |
| `--vui-divider-size`               | `1px`                                        | Line thickness           |
| `--vui-divider-height`             | `auto`                                       | Vertical divider height  |
| `--vui-divider-type`               | `solid`                                      | Border style             |
| `--vui-divider-color`              | [`var(--color-border)`](/docs/tokens/colors) | Line color               |
| `--vui-divider-slot-outline-color` | [`var(--color-bg)`](/docs/tokens/colors)     | Slot label outline color |
