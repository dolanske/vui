# Switch

The Switch component is a form control that allows users to toggle between two states. It provides a visual representation of a boolean value and can be customized with labels and different styles.

::switch-example{sourcePath="Switch/Switch.vue"}
```vue
<script setup lang="ts">
import { Switch } from '@dolanske/vui'
import { ref } from 'vue'

const enabled = ref(false)
</script>

<template>
  <Switch v-model="enabled" label="You're awesome" />
</template>
```

::

### Props

| Name         | Default | Type                                                   |
| ------------ | ------- | ------------------------------------------------------ |
| `modelValue` | —       | `boolean` <br> The current state of the switch         |
| `label`      | —       | `string` <br> The label text for the switch            |
| `disabled`   | `false` | `boolean` <br> Whether the switch is disabled          |
| `accent`     | `false` | `boolean` <br> Whether to use the accent color         |
| `reversed`   | `false` | `boolean` <br> Reverses the switch and label positions |
| `hint`       | —       | `string` <br> Helper text displayed below the switch   |

### Events

| Name                | Payload   | Description                           |
| ------------------- | --------- | ------------------------------------- |
| `update:modelValue` | `boolean` | Emitted when the switch state changes |

### Slots

| Name      | Accepts | Description                                                                   |
| --------- | ------- | ----------------------------------------------------------------------------- |
| `default` | `any`   | Content to be displayed as the label (overrides the `label` prop if provided) |

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                           | Default  | Description                     |
| ------------------------------- | -------- | ------------------------------- |
| `--vui-switch-size`             | `24px`   | Toggle indicator size           |
| `--vui-switch-indicator-offset` | `6px`    | Indicator inset from track edge |
| `--vui-switch-align`            | `center` | Vertical alignment of switch    |
