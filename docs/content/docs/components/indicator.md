# Indicator

A small dot indicator that can be used standalone or attached to other components like `Avatar`, `Badge`, `Buttons` and more to convey status such as online presence or alerts.

::indicator-example

```vue
<script setup>
import { Avatar, Badge, Indicator } from '@dolanske/vui'
</script>

<template>
  <Avatar url="https://github.com/dolanske.png" size="l">
    <template #overlay>
      <Indicator variant="online" position="bottom-right" outline />
    </template>
  </Avatar>

  <Badge outline size="l">
    Important
    <Indicator variant="alert" position="top-right" ripple />
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

### Slots

| Name      | Accepts | Description                                                              |
| --------- | ------- | ------------------------------------------------------------------------ |
| `default` | `any`   | Optional content to wrap. Useful if you want to place a tiny icon inside |
