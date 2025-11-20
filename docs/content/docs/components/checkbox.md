# Checkbox

A checkbox component that supports custom icons, labels, and various states. It can be used as a controlled or uncontrolled component.

::checkbox-example

```vue
<script setup>
import { Checkbox } from '@dolanske/vui'
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
  <Checkbox v-model="checked" label="Basic checkbox" />
  <Checkbox v-model="checked" label="Disabled checkbox" disabled />
  <Checkbox v-model="checked" label="Checked checkbox" checked />
  <Checkbox v-model="checked" accent>
    <template #icon-on>
      <IconToggleLeft />
    </template>
    <template #icon-off>
      <IconToggleRightFill />
    </template>
    <template #default>
      Custom icons with <code>accent</code> color
    </template>
  </Checkbox>
</template>
```

::

### Props

| Name       | Default | Type                                                             |
| ---------- | ------- | ---------------------------------------------------------------- |
| `label`    | —       | `string` <br> Text label for the checkbox                        |
| `disabled` | `false` | `boolean` <br> Disables the checkbox                             |
| `checked`  | —       | `boolean` <br> Controls the checked state (for controlled usage) |
| `accent`   | `false` | `boolean` <br> Uses accent color for the checkbox                |

### Events

| Name     | Payload   | Description                             |
| -------- | --------- | --------------------------------------- |
| `change` | `boolean` | Emitted when the checkbox state changes |

### Slots

| Name       | Accepts                  | Description                                                                   |
| ---------- | ------------------------ | ----------------------------------------------------------------------------- |
| `default`  | `any`                    | Content to be displayed as the label (overrides the `label` prop if provided) |
| `icon-on`  | `'ph:check-square-fill'` | Slot which renders when the component is checked                              |
| `icon-off` | `'ph:square'`            | Slot which renders when the component is not checked                          |
