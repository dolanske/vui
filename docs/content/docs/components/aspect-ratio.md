# Aspect Ratio

A layout component that constrains its content to a given aspect ratio. It automatically fills the available width and adjusts height to maintain the ratio. Images and videos inside will be automatically sized to cover the container.

::aspect-ratio-example{sourcePath="AspectRatio/AspectRatio.vue"}

```vue
<script setup lang="ts">
import { AspectRatio } from '@dolanske/vui'
</script>

<template>
  <AspectRatio :ratio="16 / 9">
    <img src="..." alt="Image loading...">
  </AspectRatio>
</template>
```

::

### Props

| Name    | Default | Type                                                                                   |
| ------- | ------- | -------------------------------------------------------------------------------------- |
| `ratio` | —       | `number` <br> The aspect ratio as a single number (e.g. `16/9`, `1`, `4/3`). Required. |

### Slots

| Name      | Accepts | Description                                            |
| --------- | ------- | ------------------------------------------------------ |
| `default` | `any`   | The content rendered inside the aspect ratio container |

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                         | Default                                                | Description                     |
| ----------------------------- | ------------------------------------------------------ | ------------------------------- |
| `--vui-aspect-ratio-value`    | `0%`                                                   | Aspect ratio as padding-bottom  |
| `--vui-aspect-ratio-radius`   | [`var(--border-radius-m)`](/docs/tokens/border-radius) | Border radius of the container  |
| `--vui-aspect-ratio-fit`      | `cover`                                                | Object-fit for inner media      |
| `--vui-aspect-ratio-position` | `center`                                               | Object-position for inner media |
