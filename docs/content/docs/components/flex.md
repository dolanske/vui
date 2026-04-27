# Flex

A flexible box layout component that provides a convenient way to create flexbox layouts with various alignment and spacing options.

Most layout controls are boolean toggles. When you omit them, Flex falls back to CSS defaults: `row`, `nowrap`, `flex-start`, and the theme `s` gap.

::flex-example

```vue
<script setup>
import { Flex } from '@dolanske/vui'
</script>

<template>
  <Flex gap="l" column>
    <Flex
      v-for="size in ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']"
      :key="size"
      :gap="size"
      expand
      y-center
    >
      <div v-for="key in 3" :key class="flex-1">
        {{ size.toUpperCase() }}
      </div>
    </Flex>
  </Flex>
</template>
```

::

### Props

The idea is that you control the component by using boolean props. This allows you to define layouts quickly.

| Name             | Default      | Type                                                                                                                     |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `inline`         | `false`      | `boolean` <br> Makes the flex container inline                                                                           |
| `wrap`           | `false`      | `boolean` <br> Allows flex items to wrap to multiple lines                                                               |
| `wrap-reverse`   | `false`      | `boolean` <br> Reverses the wrap direction                                                                               |
| `row`            | `row`        | `boolean` <br> Sets flex direction to row                                                                                |
| `column`         | `false`      | `boolean` <br> Sets flex direction to column                                                                             |
| `row-reverse`    | `false`      | `boolean` <br> Sets flex direction to row-reverse                                                                        |
| `column-reverse` | `false`      | `boolean` <br> Sets flex direction to column-reverse                                                                     |
| `gap`            | `s`          | `xxs` `xs` `s` `m` `l` `xl` `xxl` `xxxl` `number` <br> Gap between flex items (theme spacing token or custom unit value) |
| `center`         | `false`      | `boolean` <br> Centers items on both axes                                                                                |
| `x-start`        | `flex-start` | `boolean` <br> Aligns items to the start of the main axis                                                                |
| `x-end`          | `false`      | `boolean` <br> Aligns items to the end of the main axis                                                                  |
| `x-center`       | `false`      | `boolean` <br> Centers items along the main axis                                                                         |
| `x-between`      | `false`      | `boolean` <br> Distributes items with space between them                                                                 |
| `x-around`       | `false`      | `boolean` <br> Distributes items with space around them                                                                  |
| `x-evenly`       | `false`      | `boolean` <br> Distributes items with equal space around them                                                            |
| `y-start`        | `flex-start` | `boolean` <br> Aligns items to the start of the cross axis                                                               |
| `y-end`          | `false`      | `boolean` <br> Aligns items to the end of the cross axis                                                                 |
| `y-center`       | `false`      | `boolean` <br> Centers items along the cross axis                                                                        |
| `y-baseline`     | `false`      | `boolean` <br> Aligns items along their baselines                                                                        |
| `y-stretch`      | `false`      | `boolean` <br> Stretches items across the cross axis                                                                     |
| `expand`         | `false`      | `boolean` <br> Makes the flex container expand to full width                                                             |

### Slots

| Name      | Accepts | Description                   |
| --------- | ------- | ----------------------------- |
| `default` | `any`   | The flex items to be laid out |
