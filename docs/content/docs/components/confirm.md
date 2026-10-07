# Confirm

A small dialog asking the user to confirm or cancel an action. It is built on top of the [Modal](/docs/components/modal) and accepts all of its props.

The dialog is a `role="alertdialog"` labelled by its title. When it opens, the least destructive button receives focus: the cancel button, or the confirm button when `show-cancel` is off. Dismissing the dialog with `Esc`, the backdrop or the close button counts as cancelling.

```vue
<script setup>
import { Button, Confirm } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(false)

function deleteProject() {
  // ...
}
</script>

<template>
  <Button variant="danger" @click="isOpen = true">
    Delete project
  </Button>

  <Confirm
    v-model:open="isOpen"
    title="Delete project?"
    content="This permanently removes the project and all of its files."
    confirm-text="Delete"
    confirm-variant="danger"
    @confirm="deleteProject"
  />
</template>
```

### Props

All [Modal](/docs/components/modal) props are supported. `size` defaults to `s`.

| Name             | Default  | Type                                                                                 |
| ---------------- | -------- | ------------------------------------------------------------------------------------ |
| `open`           | `false`  | `boolean` <br> Controls the visibility. Supports `v-model:open`                      |
| `title`          | —        | `string` <br> Rendered in the header and used as the accessible name of the dialog   |
| `content`        | —        | `string` <br> Text rendered in the body. Use the default slot for richer content     |
| `confirmText`    | `Ok`     | `string` <br> Label of the confirm button                                            |
| `confirmVariant` | `gray`   | `Variants` <br> Variant of the confirm button, e.g. `danger` for destructive actions |
| `cancelText`     | `Cancel` | `string` <br> Label of the cancel button                                             |
| `showCancel`     | `true`   | `boolean` <br> Whether to show the cancel button                                     |

### Events

| Name          | Payload   | Description                                                          |
| ------------- | --------- | -------------------------------------------------------------------- |
| `confirm`     | —         | Emitted when the confirm button is clicked                           |
| `cancel`      | —         | Emitted when the cancel button is clicked or the dialog is dismissed |
| `close`       | —         | Emitted after `confirm` or `cancel`                                  |
| `update:open` | `boolean` | Emitted together with `close`, used by `v-model:open`                |

### Slots

| Name      | Accepts | Description                               |
| --------- | ------- | ----------------------------------------- |
| `default` | `any`   | Body content, replaces the `content` prop |
| `header`  | `any`   | Header content, replaces the `title` prop |
