# Sheet

The Sheet component is a slide-out panel that can be positioned on any side of the screen. It's commonly used for displaying additional content, forms, or navigation menus.

Like the [Modal](/docs/components/modal), the sheet is a `role="dialog"` which keeps focus inside while open, returns focus when it closes and locks page scrolling. Its content stays clear of notches and the home indicator on mobile devices.

::sheet-example{sourcePath="Sheet/Sheet.vue"}

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

| Name              | Default | Type                                                                                                                                                                            |
| ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`            | `false` | `boolean`<br>Controls the visibility of the sheet. Supports `v-model:open`                                                                                                      |
| `position`        | `right` | `left` `right` `top` `bottom`<br>Controls the position of the sheet                                                                                                             |
| `size`            | —       | `number` `string`<br>Maximum width of left / right sheets (defaults to `398`), or maximum height of top / bottom sheets (defaults to `35dvh`)                                   |
| `canDismiss`      | `true`  | `boolean`<br>Whether the sheet can be closed with Escape or by clicking the backdrop                                                                                            |
| `hideCloseButton` | `false` | `boolean`<br>Hides the X button. The sheet can still be closed by other means                                                                                                   |
| `closeLabel`      | `Close` | `string`<br>Accessible label of the close button                                                                                                                                |
| `card`            | -       | `CardProps`<br>Props to pass to the underlying [Card](/docs/components/card) component                                                                                          |
| `transition-name` | `sheet` | `string` `none` <br> Allows you to change or disable the vue transition for the sheet appear. By default, a `fade` animation with direction depending on the placement is used. |

### Events

| Name          | Payload   | Description                                           |
| ------------- | --------- | ----------------------------------------------------- |
| `close`       | -         | Emitted when the sheet is closed                      |
| `update:open` | `boolean` | Emitted together with `close`, used by `v-model:open` |

### Slots

| Name      | Props                   | Description                     |
| --------- | ----------------------- | ------------------------------- |
| `default` | `{ close: () => void }` | The main content of the sheet   |
| `header`  | `{ close: () => void }` | The header content of the sheet |
| `footer`  | `{ close: () => void }` | The footer content of the sheet |

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                       | Default | Description                        |
| --------------------------- | ------- | ---------------------------------- |
| `--vui-sheet-inline-offset` | `24px`  | Horizontal offset from screen edge |
| `--vui-sheet-max-height`    | `35dvh` | Max height in bottom sheet mode    |
