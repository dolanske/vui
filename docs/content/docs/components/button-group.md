# Button Group

A wrapper component that groups multiple buttons together, joining their borders for a cohesive, unified appearance. Commonly used for toolbars, split buttons, or any set of related actions. The wrapper has `role="group"`, pass an `aria-label` to name the group.

::button-group-example{sourcePath="Button/ButtonGroup.vue"}

```vue
<script setup>
import { Button, ButtonGroup } from '@dolanske/vui'
</script>

<template>
  <ButtonGroup :gap="2">
    <Button outline>
      Hello
    </Button>
    <Button outline>
      <IconCaretDown />
    </Button>
  </ButtonGroup>

  <ButtonGroup>
    <Button square aria-label="Bold">
      <IconTextBold />
    </Button>
    <Button square aria-label="Italic">
      <IconTextItalic />
    </Button>
    <Button square aria-label="Underline">
      <IconTextAUnderline />
    </Button>
  </ButtonGroup>
</template>
```

::

### Props

| Name       | Default | Type                                                                                                                                             |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `vertical` | `false` | `boolean` <br> Stacks the buttons vertically instead of horizontally                                                                             |
| `gap`      | `0`     | `xxxs` `xxs` `xs` `s` `m` `l` `xl` `xxl` `xxxl` `number` <br> Gap between buttons in the group. When `0`, borders are merged for a seamless look |

### Slots

| Name      | Accepts  | Description                                   |
| --------- | -------- | --------------------------------------------- |
| `default` | `Button` | One or more `Button` components to be grouped |
