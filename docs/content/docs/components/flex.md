# Flex

A flexible box layout component that provides a convenient way to create flexbox layouts with various alignment and spacing options.

::flex-example

```vue
<script setup>
import { Button, Flex } from '@dolanske/vui'
</script>

<template>
  <Flex gap="m" x-center y-center>
    <Button>Item 1</Button>
    <Button>Item 2</Button>
    <Button>Item 3</Button>
  </Flex>
</template>
```

::

### Props

| Name            | Default | Type              | Description                                                  |
| --------------- | ------- | ----------------- | ------------------------------------------------------------ |
| `inline`        | `false` | `boolean`         | Makes the flex container inline                              |
| `wrap`          | `false` | `boolean`         | Allows flex items to wrap to multiple lines                  |
| `wrapReverse`   | `false` | `boolean`         | Reverses the wrap direction                                  |
| `row`           | `true`  | `boolean`         | Sets flex direction to row                                   |
| `column`        | `false` | `boolean`         | Sets flex direction to column                                |
| `rowReverse`    | `false` | `boolean`         | Sets flex direction to row-reverse                           |
| `columnReverse` | `false` | `boolean`         | Sets flex direction to column-reverse                        |
| `gap`           | `'s'`   | `Space \| number` | Gap between flex items (uses theme spacing or custom number) |
| `xStart`        | `true`  | `boolean`         | Aligns items to the start of the main axis                   |
| `xEnd`          | `false` | `boolean`         | Aligns items to the end of the main axis                     |
| `xCenter`       | `false` | `boolean`         | Centers items along the main axis                            |
| `xBetween`      | `false` | `boolean`         | Distributes items with space between them                    |
| `xAround`       | `false` | `boolean`         | Distributes items with space around them                     |
| `xEvenly`       | `false` | `boolean`         | Distributes items with equal space around them               |
| `yCenter`       | `false` | `boolean`         | Centers items along the cross axis                           |
| `yStart`        | `true`  | `boolean`         | Aligns items to the start of the cross axis                  |
| `yEnd`          | `false` | `boolean`         | Aligns items to the end of the cross axis                    |
| `yBaseline`     | `false` | `boolean`         | Aligns items along their baselines                           |
| `expand`        | `false` | `boolean`         | Makes the flex container expand to full width                |

### Slots

| Name      | Description                   |
| --------- | ----------------------------- |
| `default` | The flex items to be laid out |

Here are some examples of different flex layouts:

```vue
<script setup>
import { Button, Flex } from '@dolanske/vui'
</script>

<template>
  <!-- Row with space between -->
  <Flex x-between class="mb-md">
    <Button>Left</Button>
    <Button>Right</Button>
  </Flex>

  <!-- Column with center alignment -->
  <Flex column x-center gap="m" class="mb-md">
    <Button>Top</Button>
    <Button>Middle</Button>
    <Button>Bottom</Button>
  </Flex>

  <!-- Wrapped row with custom gap -->
  <Flex wrap :gap="16">
    <Button>Item 1</Button>
    <Button>Item 2</Button>
    <Button>Item 3</Button>
    <Button>Item 4</Button>
  </Flex>
</template>
```
