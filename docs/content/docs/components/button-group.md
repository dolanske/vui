# Button Group

A wrapper component that groups multiple buttons together, joining their borders for a cohesive, unified appearance. Commonly used for toolbars, split buttons, or any set of related actions.

::button-group-example

```vue
<script setup>
import { Button, ButtonGroup } from '@dolanske/vui'
</script>

<template>
  <ButtonGroup>
    <Button outline :gap="2">
      Hello
    </Button>
    <Button outline>
      <IconCaretDown />
    </Button>
  </ButtonGroup>

  <ButtonGroup>
    <Button square active>
      <IconTextBBold />
    </Button>
    <Button square>
      <IconTextBold />
    </Button>
    <Button square>
      <IconTextItalic />
    </Button>
    <Button square>
      <IconTextAUnderline />
    </Button>
  </ButtonGroup>
</template>
```

::

### Props

| Name       | Default | Type                                                                                                                                      |
| ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `vertical` | `false` | `boolean` <br> Stacks the buttons vertically instead of horizontally                                                                      |
| `gap`      | `0`     | `xxs` `xs` `s` `m` `l` `xl` `xxl` `xxxl` `number` <br> Gap between buttons in the group. When `0`, borders are merged for a seamless look |

### Slots

| Name      | Accepts  | Description                                   |
| --------- | -------- | --------------------------------------------- |
| `default` | `Button` | One or more `Button` components to be grouped |
