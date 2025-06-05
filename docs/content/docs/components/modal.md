# Modal

A modal component that displays content in a floating window over the main content. It supports various sizes, customization options, and can be used for dialogs, forms, or any other content that needs to be displayed in a focused context above the page content.

::modal-example

```vue
<script setup lang="ts">
import { Button, Flex, Modal } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <Button @click="isOpen = true">
    Basic Modal
  </Button>
  <Modal :open="isOpen" size="m" :card="{ separators: true }" @close="isOpen = false">
    <template #header>
      <h4>Modal </h4>
    </template>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad harum id, distinctio voluptatum repellat eveniet repellendus saepe velit rem illo facere aspernatur iste nam, quasi dolores expedita consectetur enim autem?</p>
    <template #footer="{ close }">
      <Flex x-end>
        <Button @click="close">
          Close
        </Button>
      </flex>
    </template>
  </Modal>
</template>
```

::

## Props

| Name         | Default | Type                                                                                   |
| ------------ | ------- | -------------------------------------------------------------------------------------- |
| `open`       | `false` | `boolean`<br>Controls the visibility of the modal                                      |
| `size`       | `'m'`   | `xs` `s` `m` `l` `xl` `screen` `screen` <br> Controls the width of the modal           |
| `card`       | -       | `CardProps`<br>Props to pass to the underlying [Card](/docs/components/card) component |
| `scrollable` | `false` | `boolean`<br>Makes the modal content scrollable instead of the modal itself            |
| `centered`   | `false` | `boolean`<br>Centers the modal vertically on the screen                                |
| `canDismiss` | `true`  | `boolean`<br>Whether the modal can be closed by clicking the X button                  |

## Events

| Name    | Payload | Description                      |
| ------- | ------- | -------------------------------- |
| `close` | -       | Emitted when the modal is closed |

## Slots

| Name      | Props                   | Description                   |
| --------- | ----------------------- | ----------------------------- |
| `default` | `{ close: () => void }` | The main content of the modal |
| `header`  | `{ close: () => void }` | Custom header content         |
| `footer`  | `{ close: () => void }` | Custom footer content         |
