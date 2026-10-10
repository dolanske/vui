# Select

A versatile select component that allows users to choose one or more options from a dropdown list. It supports single and multiple selection, search, disabled options, option groups and custom option rendering.

The trigger is a button opening a `listbox`. Options are `option` elements announcing whether they are selected. `↓` / `↑` on the trigger open the list, the arrow keys, `Home`, `End` and typeahead move between options, and typing into the search moves to the first result with `↓`. The list is at least as wide as the trigger and the search is cleared whenever it closes.

::select-example{sourcePath="Select/Select.vue"}

```vue
<script setup lang="ts">
import { Select } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref()
const options = [
  { value: 'andrew', label: 'Andrew', group: 'Team A' },
  { value: 'john', label: 'John', group: 'Team A' },
  { value: 'jane', label: 'Jane', group: 'Team B' },
  { value: 'jill', label: 'Jill', group: 'Team B', disabled: true },
]
</script>

<template>
  <Select
    v-model="selected"
    search
    name="friends"
    :options="options"
    label="Select friends"
    placeholder="Click me..."
    :single="false"
  />
</template>
```

::

### Props

| Name               | Default            | Type                                                                                                                                                                                                                                                                                                                                                 |
| ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modelValue`       | —                  | `SelectOption[]` `undefined` <br> The selected option(s). The model is replaced on every change, never mutated                                                                                                                                                                                                                                       |
| `options`          | —                  | `SelectOption[]` <br> Array of options to display                                                                                                                                                                                                                                                                                                    |
| `single`           | `true`             | `boolean` <br> Whether to allow only single selection                                                                                                                                                                                                                                                                                                |
| `readonly`         | `false`            | `boolean` <br> The list can be opened but nothing can be selected or cleared                                                                                                                                                                                                                                                                         |
| `label`            | —                  | `string` <br> The label text for the select                                                                                                                                                                                                                                                                                                          |
| `placeholder`      | `Select an option` | `string` <br> Placeholder text when no option is selected                                                                                                                                                                                                                                                                                            |
| `hint`             | —                  | `string` <br> Helper text displayed under the label, linked with `aria-describedby`                                                                                                                                                                                                                                                                  |
| `search`           | `false`            | `boolean` <br> Whether to enable search functionality                                                                                                                                                                                                                                                                                                |
| `required`         | `false`            | `boolean` <br> Prevents removing the last selected option                                                                                                                                                                                                                                                                                            |
| `errors`           | `[]`               | `string[]` <br> Array of error messages to display. Marks the trigger as invalid                                                                                                                                                                                                                                                                     |
| `disabled`         | `false`            | `boolean` <br> Whether the select is disabled                                                                                                                                                                                                                                                                                                        |
| `size`             | `m`                | `s` `m` `l` <br> Controls the input height and padding                                                                                                                                                                                                                                                                                               |
| `showClear`        | `false`            | `boolean` <br> Shows a clear button when there is a selected value. Hidden while `required`, `readonly` or `disabled`                                                                                                                                                                                                                                |
| `maxActiveOptions` | —                  | `number` <br> Maximum number of options that can be selected (multiple mode only)                                                                                                                                                                                                                                                                    |
| `name`             | —                  | `string` <br> Native `name`. Renders hidden inputs with the selected values, so the select is part of form submissions. Object values are serialized as JSON                                                                                                                                                                                         |
| `maxHeight`        | —                  | `number` `string` <br> Maximum height of the dropdown before it starts scrolling                                                                                                                                                                                                                                                                     |
| `noMobileDrawer`   | `false`            | `boolean` <br> Disables mobile drawer behavior in the underlying dropdown                                                                                                                                                                                                                                                                            |
| `transition-name`  | —                  | `string` `none` <br> Allows you to change or disable the Vue transition for dropdown appear. By default, placement-based transition is used. Set to `none` when using the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) to prevent the default animation from conflicting with your view transition. |

### Events

| Name                | Payload                      | Description                    |
| ------------------- | ---------------------------- | ------------------------------ |
| `update:modelValue` | `SelectOption[]` `undefined` | Emitted when selection changes |

### Slots

| Name     | Props                                         | Description                         |
| -------- | --------------------------------------------- | ----------------------------------- |
| `option` | `{ option: SelectOption, selected: boolean }` | Custom rendering of a single option |

### Types

```ts
interface SelectOption {
  value: any
  label: string
  // Shown but can not be selected
  disabled?: boolean
  // Options sharing a group name are rendered together under a heading
  group?: string
}
```
