# Flex

A flexible box layout component that provides a convenient way to create flexbox layouts with various alignment and spacing options.

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

The idea is that you control the component by using boolean props. This way it should be a breeze to define any layouts you want.
| Name | Default | Type |
| --------------- | ------- | -------------------------------------------------------------------- |
| `inline` | `false` | `boolean` <br> Makes the flex container inline |
| `wrap` | `false` | `boolean` <br> Allows flex items to wrap to multiple lines |
| `wrap-reverse` | `false` | `boolean` <br> Reverses the wrap direction |
| `row` | `true` | `boolean` <br> Sets flex direction to row |
| `column` | `false` | `boolean` <br> Sets flex direction to column |
| `row-reverse` | `false` | `boolean` <br> Sets flex direction to row-reverse |
| `column-reverse` | `false` | `boolean` <br> Sets flex direction to column-reverse |
| `gap` | `s` | `xxs` `xs` `s` `m` `l` `xl` `xxl` `xxxl` `number` <br> Gap between flex items (uses theme spacing or custom number) |
| `x-start` | `true` | `boolean` <br> Aligns items to the start of the main axis |
| `x-end` | `false` | `boolean` <br> Aligns items to the end of the main axis |
| `x-center` | `false` | `boolean` <br> Centers items along the main axis |
| `x-between` | `false` | `boolean` <br> Distributes items with space between them |
| `x-around` | `false` | `boolean` <br> Distributes items with space around them |
| `x-evenly` | `false` | `boolean` <br> Distributes items with equal space around them |
| `y-center` | `false` | `boolean` <br> Centers items along the cross axis |
| `y-start` | `true` | `boolean` <br> Aligns items to the start of the cross axis |
| `y-end` | `false` | `boolean` <br> Aligns items to the end of the cross axis |
| `y-baseline` | `false` | `boolean` <br> Aligns items along their baselines |
| `expand` | `false` | `boolean` <br> Makes the flex container expand to full width |

### Slots

| Name      | Accepts | Description                   |
| --------- | ------- | ----------------------------- |
| `default` | `any`   | The flex items to be laid out |

### Examples

A few simple code examples of how a flex layout might look like.

```vue
<script setup>
import { Flex } from '@dolanske/vui'
</script>

<template>
  <!-- Row with space between -->
  <Flex x-between>
    <p>Left</p>
    <p>Right</p>
  </Flex>

  <!-- Column with center alignment -->
  <Flex column x-center gap="m">
    <p>Top</p>
    <p>Middle</p>
    <p>Bottom</p>
  </Flex>

  <!-- Wrapped row with custom gap -->
  <Flex wrap :gap="16">
    <p>Item 1</p>
    <p>Item 2</p>
    <p>Item 3</p>
    <p>Item 4</p>
  </Flex>
</template>
```
