# Toast

A toast notification component that displays temporary messages to users. It supports variants, custom actions, descriptions, custom body components and updating toasts after they were shown.

Toasts are rendered by the `<Toasts />` component, which must be mounted once in your app (for example in `App.vue`). Without it, `pushToast` has no visible effect.

```vue
<!-- App.vue -->
<template>
  <RouterView />
  <Toasts placement="bottom-end" />
</template>
```

Toasts live in a polite `aria-live` region, `danger` toasts are announced assertively. Every toast has a close button by default. Timers pause while the toasts are hovered or focused, so they never disappear while being read (WCAG 2.2.1).

::toast-example{sourcePath="Toast/Toasts.vue"}

```vue
<script setup>
import { Button, Flex, pushToast } from '@dolanske/vui'

function showBasicToast() {
  pushToast('Operation successful', { variant: 'success' })
}

function showActionToast() {
  pushToast('File deleted', {
    description: 'The file has been moved to trash',
    action: {
      label: 'Undo',
      handler: (_toastId) => {
        // Handle undo action, the toast closes afterwards
      },
    },
  })
}
</script>

<template>
  <Flex gap="m">
    <Button @click="showBasicToast">
      Show Basic Toast
    </Button>
    <Button @click="showActionToast">
      Show Action Toast
    </Button>
  </Flex>
</template>
```

::

## Toasts component

### Props

| Name           | Default         | Type                                                                             |
| -------------- | --------------- | -------------------------------------------------------------------------------- |
| `placement`    | `bottom-end`    | `Placement` <br> Where the toasts are shown. Offsets include safe-area insets    |
| `max`          | `5`             | `number` <br> Maximum amount of toasts shown at once. Older toasts are dismissed |
| `label`        | `Notifications` | `string` <br> Accessible name of the notifications region                        |
| `dismissLabel` | `Dismiss`       | `string` <br> Accessible label of the close buttons                              |

## API

### pushToast

The main function to create and display a toast notification. It returns the toast object it just created, including the `id` which can be used to update or remove the toast.

| Name      | Type           | Description                          |
| --------- | -------------- | ------------------------------------ |
| `title`   | `string`       | The main message of the toast        |
| `options` | `ToastOptions` | Optional configuration for the toast |

#### ToastOptions

| Name          | Type           | Default   | Description                                                                          |
| ------------- | -------------- | --------- | ------------------------------------------------------------------------------------ |
| `variant`     | `ToastVariant` | `neutral` | `neutral` `info` `success` `warning` `danger`. Sets the icon and color               |
| `persist`     | `boolean`      | `false`   | Whether the toast stays until it is dismissed with its close button or `removeToast` |
| `timeout`     | `number`       | `7000`    | Time in milliseconds before the toast automatically disappears                       |
| `dismissible` | `boolean`      | `true`    | Shows a close button                                                                 |
| `action`      | `ToastAction`  | -         | Optional action button configuration                                                 |
| `description` | `string`       | -         | Additional descriptive text to display below the title                               |
| `body`        | `Component`    | -         | Custom Vue component to render in the toast body                                     |
| `bodyProps`   | `object`       | `{}`      | Passed to the custom body component as its `data` prop                               |

#### ToastAction

| Name       | Type                        | Description                                              |
| ---------- | --------------------------- | -------------------------------------------------------- |
| `label`    | `string`                    | Text to display on the action button                     |
| `handler`  | `(toastId: number) => void` | Function to call when the action is clicked              |
| `keepOpen` | `boolean`                   | Keeps the toast open after the action. Closes by default |

### updateToast

Updates an existing toast, e.g. to turn a "Saving…" toast into "Saved". Passing `timeout` or `persist` restarts or stops the auto dismiss timer.

```ts
const toast = pushToast('Saving…', { persist: true })
await save()
updateToast(toast.id, { title: 'Saved', variant: 'success', persist: false })
```

### removeToast

Function to manually remove a toast notification.

| Name | Type     | Description                   |
| ---- | -------- | ----------------------------- |
| `id` | `number` | The ID of the toast to remove |

## Examples

#### Persistent Toast

::toast-persistent-example

```vue
<script setup>
import { Button, pushToast } from '@dolanske/vui'

function showPersistentToast() {
  pushToast('Important message', {
    persist: true,
    description: 'This toast will stay until it is dismissed',
  })
}
</script>

<template>
  <Button @click="showPersistentToast">
    Show Persistent Toast
  </Button>
</template>
```

::

#### Custom Body Toast

The custom body is rendered inside the toast list item. It receives `data` (the `bodyProps`) and `toastId`.

::toast-custom-body-example

```vue
<script setup>
import { Button, pushToast } from '@dolanske/vui'
import { defineComponent, h } from 'vue'

const CustomBody = defineComponent({
  props: {
    data: Object,
    toastId: Number,
  },
  render() {
    return h('div', { class: 'custom-toast-body' }, [
      h('p', `Custom content for toast id: ${this.toastId}`),
      h('pre', JSON.stringify(this.data, null, 2)),
    ])
  },
})

function showCustomToast() {
  pushToast('Custom Toast', {
    body: CustomBody,
    bodyProps: { customData: 'This is custom data' },
  })
}
</script>

<template>
  <Button @click="showCustomToast">
    Show Custom Toast
  </Button>
</template>
```

::

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                   | Default | Description                                           |
| ----------------------- | ------- | ----------------------------------------------------- |
| `--vui-toast-offset`    | `32px`  | Distance from screen edge, safe-area insets are added |
| `--vui-toast-max-width` | `392px` | Max toast container width                             |
