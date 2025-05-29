# Toast

A toast notification component that displays temporary messages to users. It supports various options like custom actions, descriptions, and custom body components.

## Usage

```vue
<script setup>
import { pushToast } from '@dolanske/vui'

// Show a simple toast
pushToast('Operation successful')

// Show a toast with description and action
pushToast('File deleted', {
  description: 'The file has been moved to trash',
  action: {
    label: 'Undo',
    handler: () => {
      // Handle undo action
    },
  },
})
</script>
```

## API

### pushToast

The main function to create and display a toast notification.

#### Parameters

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

#### Parameters

| Name | Type     | Description                   |
| ---- | -------- | ----------------------------- |
| `id` | `number` | The ID of the toast to remove |

## Examples

### Basic Toast

```vue
<script setup>
import { pushToast } from '@dolanske/vui'

function showBasicToast() {
  pushToast('Operation successful')
}
</script>

<template>
  <Button @click="showBasicToast">
    Show Toast
  </Button>
</template>
```

### Toast with Description and Action

```vue
<script setup>
import { pushToast } from '@dolanske/vui'

function showActionToast() {
  pushToast('File deleted', {
    description: 'The file has been moved to trash',
    action: {
      label: 'Undo',
      handler: (toastId) => {
        // Handle undo action
        console.log('Undo clicked for toast:', toastId)
      },
    },
  })
}
</script>

<template>
  <Button @click="showActionToast">
    Show Action Toast
  </Button>
</template>
```

### Persistent Toast

```vue
<script setup>
import { pushToast } from '@dolanske/vui'

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

### Custom Body Toast

```vue
<script setup>
import { pushToast } from '@dolanske/vui'

const CustomBody = defineComponent({
  props: {
    data: Object,
    toastId: Number,
  },
  template: `
    <div class="custom-toast-body">
      <p>Custom content for toast {{ toastId }}</p>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  `,
})

function showCustomToast() {
  pushToast('Custom Toast', {
    body: CustomBody,
    bodyProps: {
      customData: 'This is custom data',
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
