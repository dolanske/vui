# Grid

A simple grid layout component that provides a convenient way to create grid layouts with various alignment and spacing options. Note that this component is not meant for complex grid layouts.

::grid-example

```vue
<script setup>
import { Button, Grid } from '@dolanske/vui'
</script>

<template>
  <Grid :columns="3" gap="m">
    <Button>Item 1</Button>
    <Button>Item 2</Button>
    <Button>Item 3</Button>
  </Grid>
</template>
```

::

### Props

| Name        | Default | Type               | Description                                                  |
| ----------- | ------- | ------------------ | ------------------------------------------------------------ |
| `inline`    | `false` | `boolean`          | Makes the grid container inline                              |
| `gap`       | `'s'`   | `Space \| number`  | Gap between grid items (uses theme spacing or custom number) |
| `rows`      | —       | `number \| string` | Number of rows or custom grid template rows                  |
| `columns`   | —       | `number \| string` | Number of columns or custom grid template columns            |
| `yCenter`   | `false` | `boolean`          | Centers items along the cross axis                           |
| `yStart`    | `true`  | `boolean`          | Aligns items to the start of the cross axis                  |
| `yEnd`      | `false` | `boolean`          | Aligns items to the end of the cross axis                    |
| `yBaseline` | `false` | `boolean`          | Aligns items along their baselines                           |
| `yStretch`  | `false` | `boolean`          | Stretches items to fill the cross axis                       |
| `expand`    | `false` | `boolean`          | Makes the grid container expand to full width                |

### Slots

| Name      | Description                   |
| --------- | ----------------------------- |
| `default` | The grid items to be laid out |

Here are some examples of different grid layouts:

```vue
<script setup>
import { Button, Grid } from '@dolanske/vui'
</script>

<template>
  <!-- Basic 3-column grid -->
  <Grid :columns="3" gap="m" class="mb-md">
    <Button>Item 1</Button>
    <Button>Item 2</Button>
    <Button>Item 3</Button>
  </Grid>

  <!-- Custom grid template -->
  <Grid columns="2fr 1fr 1fr" gap="m" class="mb-md">
    <Button>Wide</Button>
    <Button>Narrow</Button>
    <Button>Narrow</Button>
  </Grid>

  <!-- Grid with rows -->
  <Grid :columns="2" :rows="2" gap="m">
    <Button>Top Left</Button>
    <Button>Top Right</Button>
    <Button>Bottom Left</Button>
    <Button>Bottom Right</Button>
  </Grid>
</template>
```
