# Checkbox

A checkbox component that supports custom icons, labels, and various states. It can be used as a controlled or uncontrolled component.

::checkbox-example

```vue
<script setup>
import { Checkbox } from '@dolanske/vui'
</script>

<template>
  <Checkbox label="Accept terms and conditions" />
</template>
```

::

### Props

| Name       | Default                  | Type      | Description                                                     |
| ---------- | ------------------------ | --------- | --------------------------------------------------------------- |
| `label`    | —                        | `string`  | Text label for the checkbox                                     |
| `iconOn`   | `'ph:check-square-fill'` | `string`  | Icon to display when checkbox is checked (uses Iconify icons)   |
| `iconOff`  | `'ph:square'`            | `string`  | Icon to display when checkbox is unchecked (uses Iconify icons) |
| `disabled` | `false`                  | `boolean` | Disables the checkbox                                           |
| `checked`  | —                        | `boolean` | Controls the checked state (for controlled usage)               |
| `accent`   | `false`                  | `boolean` | Uses accent color for the checkbox                              |

### Events

| Name     | Payload   | Description                             |
| -------- | --------- | --------------------------------------- |
| `change` | `boolean` | Emitted when the checkbox state changes |

### Slots

| Name      | Description                                                                   |
| --------- | ----------------------------------------------------------------------------- |
| `default` | Content to be displayed as the label (overrides the `label` prop if provided) |

Here's an example of using custom icons and slots:

```vue
<script setup>
import { Checkbox } from '@dolanske/vui'
</script>

<template>
  <Checkbox
    icon-on="mdi:checkbox-marked"
    icon-off="mdi:checkbox-blank-outline"
    accent
  >
    <template #default>
      Custom label with <strong>HTML</strong>
    </template>
  </Checkbox>
</template>
```

### v-model

The checkbox component supports v-model for two-way binding:

```vue
<script setup>
import { Checkbox } from '@dolanske/vui'
import { ref } from 'vue'

const isChecked = ref(false)
</script>

<template>
  <Checkbox v-model="isChecked" label="Remember me" />
</template>
```
