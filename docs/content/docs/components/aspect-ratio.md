# Aspect Ratio

A layout component that constrains its content to a given aspect ratio. It automatically fills the available width and adjusts height to maintain the ratio, using the native CSS `aspect-ratio` property. Images and videos inside will be automatically sized to cover the container.

::aspect-ratio-example{sourcePath="AspectRatio/AspectRatio.vue"}

```vue
<script setup lang="ts">
import { AspectRatio } from '@dolanske/vui'
</script>

<template>
  <AspectRatio :ratio="16 / 9">
    <img src="..." alt="Mountain lake at sunrise">
  </AspectRatio>
</template>
```

::

### Props

| Name    | Default | Type                                                                                                                                            |
| ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `ratio` | —       | `number` <br> Width divided by height (e.g. `16 / 9`, `1`, `4 / 3`). Required. Zero, negative or invalid values fall back to `1` with a warning |

### Slots

| Name      | Accepts | Description                                            |
| --------- | ------- | ------------------------------------------------------ |
| `default` | `any`   | The content rendered inside the aspect ratio container |

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                         | Default                                                | Description                      |
| ----------------------------- | ------------------------------------------------------ | -------------------------------- |
| `--vui-aspect-ratio`          | `1`                                                    | Ratio, set from the `ratio` prop |
| `--vui-aspect-ratio-radius`   | [`var(--border-radius-m)`](/docs/tokens/border-radius) | Border radius of the container   |
| `--vui-aspect-ratio-fit`      | `cover`                                                | Object-fit for inner media       |
| `--vui-aspect-ratio-position` | `center`                                               | Object-position for inner media  |
