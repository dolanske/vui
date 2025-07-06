# Toast

A toast notification component that displays temporary messages to users. It supports various options like custom actions, descriptions, and custom body components.

::toast-example

```vue
<script setup>
import { Button, pushToast } from '@dolanske/vui'

function showBasicToast() {
  pushToast('Operation successful')
}

function showActionToast() {
  pushToast('File deleted', {
    description: 'The file has been moved to trash',
    action: {
      label: 'Undo',
      handler: (_toastId) => {
        // Handle undo action
      },
    },
  })
}
</script>

<template>
  <div class="flex gap-md">
    <Button @click="showBasicToast">
      Show Basic Toast
    </Button>
    <Button @click="showActionToast">
      Show Action Toast
    </Button>
  </div>
</template>
```

::

## API

### pushToast

The main function to create and display a toast notification. It returns the toast object it just created including the `id` which can be used to remove the toast before the user dismisses it.

| Name      | Type           | Description                          |
| --------- | -------------- | ------------------------------------ |
| `title`   | `string`       | The main message of the toast        |
| `options` | `ToastOptions` | Optional configuration for the toast |

#### ToastOptions

| Name          | Type          | Default | Description                                                    |
| ------------- | ------------- | ------- | -------------------------------------------------------------- |
| `persist`     | `boolean`     | `false` | Whether the toast should persist until manually dismissed      |
| `timeout`     | `number`      | `7000`  | Time in milliseconds before the toast automatically disappears |
| `action`      | `ToastAction` | -       | Optional action button configuration                           |
| `description` | `string`      | -       | Additional descriptive text to display below the title         |
| `body`        | `Component`   | -       | Custom Vue component to render in the toast body               |
| `bodyProps`   | `object`      | `{}`    | Props to pass to the custom body component                     |

#### ToastAction

| Name      | Type                        | Description                                 |
| --------- | --------------------------- | ------------------------------------------- |
| `label`   | `string`                    | Text to display on the action button        |
| `handler` | `(toastId: number) => void` | Function to call when the action is clicked |

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
    description: 'This toast will stay until manually dismissed',
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

::toast-custom-body-example

```vue
<script setup>
import { Button, pushToast } from '@dolanske/vui'
import { defineComponent, markRaw } from 'vue'

const CustomBody = markRaw(defineComponent({
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
}))

function showCustomToast() {
  pushToast('Custom Toast', {
    body: CustomBody,
    bodyProps: {
      data: { customData: 'This is custom data' },
    },
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
