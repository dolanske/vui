# Indicator

A small dot indicator that can be used standalone or attached to other components like `Avatar`, `Badge`, `Buttons` and more to convey status such as online presence or alerts.

::indicator-example{sourcePath="Indicator/Indicator.vue"}

```vue
<script setup>
import { Avatar, Badge, Indicator } from '@dolanske/vui'
</script>

<template>
  <Avatar url="https://github.com/dolanske.png" size="l">
    <template #overlay>
      <Indicator variant="online" position="bottom-right" label="Online" outline />
    </template>
  </Avatar>

  <Badge outline size="l">
    Important
    <Indicator variant="alert" position="top-right" label="Needs attention" ripple />
  </Badge>
</template>
```

::

### Props

| Name       | Default | Type                                                                                                                         |
| ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `variant`  | —       | `alert` `online` `offline` `away` <br> Controls the color of the indicator dot                                               |
| `position` | —       | `top-right` `top-left` `bottom-right` `bottom-left` <br> When set, positions the indicator absolutely over its child content |
| `size`     | `m`     | `s` `m` `l` <br> Controls the size of the indicator dot                                                                      |
| `outline`  | `false` | `boolean` <br> Adds a border around the dot, useful for contrast against colored backgrounds                                 |
| `ripple`   | `false` | `boolean` <br> Adds a pulsing ripple animation to the indicator, useful for drawing attention                                |
| `label`    | —       | `string` <br> Text announced to screen readers, e.g. "Online". The dot itself only conveys status through color              |

### Slots

| Name      | Accepts | Description                                                              |
| --------- | ------- | ------------------------------------------------------------------------ |
| `default` | `any`   | Optional content to wrap. Useful if you want to place a tiny icon inside |

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                           | Default                                            | Description               |
| ------------------------------- | -------------------------------------------------- | ------------------------- |
| `--vui-indicator-size`          | `12px` (`8px` small, `16px` large)                 | Dot diameter              |
| `--vui-indicator-color`         | [`var(--color-text-lighter)`](/docs/tokens/colors) | Dot color                 |
| `--vui-indicator-outline-color` | [`var(--color-bg)`](/docs/tokens/colors)           | Outline ring color        |
| `--vui-indicator-outline-size`  | `2px`                                              | Outline ring thickness    |
| `--vui-indicator-offset`        | `0`                                                | Offset from anchor corner |
