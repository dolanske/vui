# Keyboard Shortcut

A component that displays keyboard shortcuts and can optionally highlight when the keys are pressed. It's useful for showing keyboard shortcuts in your application.

::kbd-example

### Props

| Name        | Default | Type      | Description                                                            |
| ----------- | ------- | --------- | ---------------------------------------------------------------------- |
| `keys`      | —       | `string`  | The key or combination of keys to display (e.g., "Escape" or "Ctrl+A") |
| `label`     | —       | `string`  | Custom label to display instead of the automatically formatted keys    |
| `highlight` | `false` | `boolean` | Whether to highlight the shortcut when the keys are pressed            |

### Events

| Name      | Type | Description                          |
| --------- | ---- | ------------------------------------ |
| `trigger` | `[]` | Emitted when the shortcut is pressed |

### With Key Combination

```vue
<script setup>
import { Kbd } from '@dolanske/vui'
</script>

<template>
  <Kbd keys="Ctrl+S" />
</template>
```

### With Custom Label

```vue
<script setup>
import { Kbd } from '@dolanske/vui'
</script>

<template>
  <Kbd
    keys="Ctrl+S"
    label="Save"
  />
</template>
```

### With Highlight

```vue
<script setup>
import { Kbd } from '@dolanske/vui'
</script>

<template>
  <Kbd
    keys="Ctrl+S"
    highlight
  />
</template>
```

### With Event Handling

```vue
<script setup>
import { Kbd } from '@dolanske/vui'

function handleShortcut() {
  console.log('Shortcut triggered!')
}
</script>

<template>
  <Kbd
    keys="Ctrl+S"
    @trigger="handleShortcut"
  />
</template>
```
