# Select

A versatile select component that allows users to choose one or more options from a dropdown list. It supports both single and multiple selection modes, includes search functionality, and provides various customization options.

::select-example

```vue
<script setup lang="ts">
import { Select } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref()
const options = [
  { value: 'andrew', label: 'Andrew' },
  { value: 'john', label: 'John' },
  { value: 'jane', label: 'Jane' },
  { value: 'jill', label: 'Jill' },
]
</script>

<template>
  <Select
    v-model="selected"
    search
    :options="options"
    label="Select friends"
    placeholder="Click me..."
    :single="false"
  />
</template>
```

::

### Props

| Name          | Default | Type                                                                              |
| ------------- | ------- | --------------------------------------------------------------------------------- |
| `modelValue`  | —       | `SelectOption[]` `undefined` <br> The selected option(s)                          |
| `options`     | —       | `SelectOption[]` <br> Array of options to display                                 |
| `single`      | `true`  | `boolean` <br> Whether to allow only single selection                             |
| `readonly`    | `false` | `boolean` <br> Whether the select is readonly                                     |
| `label`       | —       | `string` <br> The label text for the select                                       |
| `placeholder` | —       | `string` <br> Placeholder text when no option is selected                         |
| `search`      | `false` | `boolean` <br> Whether to enable search functionality                             |
| `required`    | `false` | `boolean` <br> Whether the select is required                                     |
| `errors`      | `[]`    | `string[]` <br> Array of error messages to display                                |
| `disabled`    | `false` | `boolean` <br> Whether the select is disabled                                     |
| `maxSelected` | —       | `number` <br> Maximum number of options that can be selected (multiple mode only) |

### Events

| Name                | Payload                      | Description                        |
| ------------------- | ---------------------------- | ---------------------------------- |
| `update:modelValue` | `SelectOption[]` `undefined` | Emitted when selection changes     |
| `search`            | `string`                     | Emitted when search input changes  |
| `focus`             | —                            | Emitted when the select is focused |
| `blur`              | —                            | Emitted when the select is blurred |

### Types

```typescript
interface SelectOption {
  value: any
  label: string
}
```
