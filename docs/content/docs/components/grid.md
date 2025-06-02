# Grid

A simple grid layout component that provides a convenient way to create grid layouts with various alignment and spacing options. Note that this component is not meant for complex grid layouts.

::grid-example

```vue
<script setup>
import { Grid } from '@dolanske/vui'
</script>

<template>
  <Grid :columns="3" gap="m">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </Grid>

  <!-- Custom grid template -->
  <Grid columns="4fr 0.5fr 1fr" gap="m">
    <div>Wide</div>
    <div>Narrow</div>
    <div>Narrow</div>
  </Grid>

  <!-- Grid with rows -->
  <Grid :columns="2" rows="1fr 2fr" gap="m">
    <div>Top Left</div>
    <div>Top Right</div>
    <div>Bottom Left</div>
    <div>Bottom Right</div>
  </Grid>
</template>
```

::

### Props

The idea is that you control the component by using boolean props. This allows you to define layouts quickly.

| Name         | Default | Type                                                                                                                |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------------- |
| `inline`     | `false` | `boolean` <br> Makes the grid container inline                                                                      |
| `gap`        | `s`     | `xxs` `xs` `s` `m` `l` `xl` `xxl` `xxxl` `number` <br> Gap between flex items (uses theme spacing or custom number) |
| `rows`       | —       | `number` `string` <br> Number of rows or custom grid template rows                                                  |
| `columns`    | —       | `number` `string` <br> Number of columns or custom grid template columns                                            |
| `y-center`   | `false` | `boolean` <br> Centers items along the cross axis                                                                   |
| `y-start`    | `true`  | `boolean` <br> Aligns items to the start of the cross axis                                                          |
| `y-end`      | `false` | `boolean` <br> Aligns items to the end of the cross axis                                                            |
| `y-baseline` | `false` | `boolean` <br> Aligns items along their baselines                                                                   |
| `y-stretch`  | `false` | `boolean` <br> Stretches items to fill the cross axis                                                               |
| `expand`     | `false` | `boolean` <br> Makes the grid container expand to full width                                                        |

### Slots

| Name      | Accepts | Description                   |
| --------- | ------- | ----------------------------- |
| `default` | `any`   | The grid items to be laid out |
