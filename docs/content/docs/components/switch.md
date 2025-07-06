# Switch

The Switch component is a form control that allows users to toggle between two states. It provides a visual representation of a boolean value and can be customized with labels and different styles.

::switch-example

```vue
<script setup lang="ts">
import { Switch } from '@dolanske/vui'
import { ref } from 'vue'

const enabled = ref(false)
</script>

<template>
  <Switch v-model="enabled" label="Enable feature" />
  <Switch v-model="enabled" label="Disabled switch" disabled />
  <Switch v-model="enabled" label="Accent switch" accent />
  <Switch v-model="enabled">
    <div class="flex items-center gap-sm">
      <Icon name="ph:bell" />
      <span>Enable notifications</span>
    </div>
  </Switch>
</template>
```

::

### Props

| Name         | Default | Type                                           |
| ------------ | ------- | ---------------------------------------------- |
| `modelValue` | —       | `boolean` <br> The current state of the switch |
| `label`      | —       | `string` <br> The label text for the switch    |
| `disabled`   | `false` | `boolean` <br> Whether the switch is disabled  |
| `accent`     | `false` | `boolean` <br> Whether to use the accent color |

### Events

| Name                | Payload   | Description                           |
| ------------------- | --------- | ------------------------------------- |
| `update:modelValue` | `boolean` | Emitted when the switch state changes |

### Slots

| Name      | Accepts | Description                                                                   |
| --------- | ------- | ----------------------------------------------------------------------------- |
| `default` | `any`   | Content to be displayed as the label (overrides the `label` prop if provided) |
