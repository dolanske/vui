# Sheet

The Sheet component is a slide-out panel that can be positioned on any side of the screen. It's commonly used for displaying additional content, forms, or navigation menus.

::sheet-example

```vue
<script setup>
import { Button, Sheet } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <Button @click="isOpen = true">
    Open Sheet
  </Button>

  <Sheet
    :open="isOpen"
    @close="isOpen = false"
  >
    <template #header>
      <h2>Sheet Title</h2>
    </template>

    <p>Sheet content goes here</p>

    <template #footer>
      <Button @click="isOpen = false">
        Close
      </Button>
    </template>
  </Sheet>
</template>
```

::

### Props

| Name       | Default | Type                                                                                         |
| ---------- | ------- | -------------------------------------------------------------------------------------------- |
| `open`     | `false` | `boolean`<br>Controls the visibility of the sheet                                            |
| `position` | `right` | `left` `right` `top` `bottom`<br>Controls the position of the sheet                          |
| `size`     | `398`   | `number` `string`<br>Sets the width of the sheet (for left/right) or height (for top/bottom) |
| `card`     | -       | `CardProps`<br>Props to pass to the underlying [Card](/docs/components/card) component       |

### Events

| Name    | Payload | Description                      |
| ------- | ------- | -------------------------------- |
| `close` | -       | Emitted when the sheet is closed |

### Slots

| Name      | Props                   | Description                     |
| --------- | ----------------------- | ------------------------------- |
| `default` | `{ close: () => void }` | The main content of the sheet   |
| `header`  | `{ close: () => void }` | The header content of the sheet |
| `footer`  | `{ close: () => void }` | The footer content of the sheet |
