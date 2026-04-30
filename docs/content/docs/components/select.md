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

| Name               | Default | Type                                                                              |
| ------------------ | ------- | --------------------------------------------------------------------------------- |
| `modelValue`       | —       | `SelectOption[]` `undefined` <br> The selected option(s)                          |
| `options`          | —       | `SelectOption[]` <br> Array of options to display                                 |
| `single`           | `true`  | `boolean` <br> Whether to allow only single selection                             |
| `readonly`         | `false` | `boolean` <br> Whether the select is readonly                                     |
| `label`            | —       | `string` <br> The label text for the select                                       |
| `placeholder`      | —       | `string` <br> Placeholder text when no option is selected                         |
| `expand`           | `false` | `boolean` <br> Expands the select to fill available width                         |
| `hint`             | —       | `string` <br> Helper text displayed under the label                               |
| `search`           | `false` | `boolean` <br> Whether to enable search functionality                             |
| `required`         | `false` | `boolean` <br> Whether the select is required                                     |
| `errors`           | `[]`    | `string[]` <br> Array of error messages to display                                |
| `disabled`         | `false` | `boolean` <br> Whether the select is disabled                                     |
| `size`             | `m`     | `s` `m` `l` <br> Controls the input height and padding                            |
| `showClear`        | `false` | `boolean` <br> Shows a clear button when there is a selected value                |
| `maxActiveOptions` | —       | `number` <br> Maximum number of options that can be selected (multiple mode only) |
| `maxHeight`        | —       | `number` `string` <br> Maximum height of the dropdown before it starts scrolling  |
| `noMobileDrawer`   | `false` | `boolean` <br> Disables mobile drawer behavior in the underlying dropdown         |
| `transition-name`  | —       | `string` `none` <br> Allows you to change or disable the Vue transition for dropdown appear. By default, placement-based transition is used. Set to `none` when using the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) to prevent the default animation from conflicting with your view transition. |

### Events

| Name                | Payload                      | Description                    |
| ------------------- | ---------------------------- | ------------------------------ |
| `update:modelValue` | `SelectOption[]` `undefined` | Emitted when selection changes |

### Types

```typescript
interface SelectOption {
  value: any
  label: string
}
```
