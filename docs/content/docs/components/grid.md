# Grid

A simple grid layout component that provides a convenient way to create grid layouts with various alignment and spacing options. Note that this component is not meant for complex grid layouts.

Most layout controls are boolean toggles. When you omit them, Grid falls back to CSS defaults such as `grid`, `row` auto-flow, `stretch`, and the theme `s` gap.

::grid-example

```vue
<script setup>
import { Grid } from '@dolanske/vui'
</script>

<template>
  <Grid :columns="3" gap="m" center>
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

| Name               | Default   | Type                                                                                                                |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------- |
| `inline`           | `false`   | `boolean` <br> Makes the grid container inline                                                                      |
| `gap`              | `s`       | `xxs` `xs` `s` `m` `l` `xl` `xxl` `xxxl` `number` <br> Gap between grid items (theme spacing token or custom unit value) |
| `rows`             | —         | `number` `string` <br> Number of rows or custom grid template rows                                                  |
| `columns`          | —         | `number` `string` <br> Number of columns or custom grid template columns                                            |
| `center`           | `false`   | `boolean` <br> Centers items on both axes                                                                           |
| `x-start`          | `stretch` | `boolean` <br> Aligns items to the start on the inline axis                                                         |
| `x-end`            | `false`   | `boolean` <br> Aligns items to the end on the inline axis                                                           |
| `x-center`         | `false`   | `boolean` <br> Centers items on the inline axis                                                                     |
| `x-stretch`        | `stretch` | `boolean` <br> Stretches items across the inline axis                                                               |
| `y-start`          | `start`   | `boolean` <br> Aligns items to the start on the block axis                                                          |
| `y-end`            | `false`   | `boolean` <br> Aligns items to the end on the block axis                                                            |
| `y-center`         | `false`   | `boolean` <br> Centers items on the block axis                                                                      |
| `y-baseline`       | `false`   | `boolean` <br> Aligns items along their baselines                                                                   |
| `y-stretch`        | `stretch` | `boolean` <br> Stretches items across the block axis                                                                |
| `auto-flow-row`    | `row`     | `boolean` <br> Auto-places grid items by rows                                                                       |
| `auto-flow-column` | `false`   | `boolean` <br> Auto-places grid items by columns                                                                    |
| `auto-flow-dense`  | `false`   | `boolean` <br> Enables dense auto-placement packing                                                                 |
| `expand`           | `false`   | `boolean` <br> Makes the grid container expand to full width                                                        |

### Slots

| Name      | Accepts | Description                   |
| --------- | ------- | ----------------------------- |
| `default` | `any`   | The grid items to be laid out |
