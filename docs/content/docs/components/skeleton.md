# Skeleton

The Skeleton component is a loading placeholder that can be used to indicate content is being loaded. It supports various shapes and sizes, making it versatile for different use cases.

::skeleton-example

```vue
<script setup>
import { Grid, Skeleton } from '@dolanske/vui'
</script>

<template>
  <Grid :columns="3" gap="s">
    <Skeleton />
    <Skeleton :radius="16" />
    <Grid :columns="3" gap="s">
      <Skeleton :width="32" :height="32" circle />
      <Skeleton :width="32" :height="32" circle />
      <Skeleton :width="32" :height="32" circle />
    </Grid>
  </Grid>
</template>
```

::

### Props

| Name     | Default                  | Type                                                     |
| -------- | ------------------------ | -------------------------------------------------------- |
| `radius` | `var(--border-radius-s)` | `string` `number` <br> The border radius of the skeleton |
| `width`  | `100%`                   | `string` `number` <br> The width of the skeleton         |
| `height` | `32px`                   | `string` `number` <br> The height of the skeleton        |
| `circle` | `false`                  | `boolean` <br> Whether to make the skeleton circular     |
