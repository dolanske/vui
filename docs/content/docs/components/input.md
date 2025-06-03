# Input

A versatile input component that supports various input types, validation, and customization options. It includes features like character limits, error messages, and custom slots for additional content.

::input-example

```vue
<script setup>
import { Input } from '@dolanske/vui'
import { ref } from 'vue'
const email = ref()
</script>

<template>
  <Input
    v-model="email"
    expand
    label="Email"
    placeholder="example@email.com"
    :limit="32"
    required
  />
</template>
```

::

### Props

| Name          | Default | Type                                                                                                                  |
| ------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `type`        | `text`  | `text` `password` `color` `date` `email` `number` `range` `search` `tel` `time` `url` `file` <br> Type of input field |
| `label`       | —       | `string` <br> Label text for the input                                                                                |
| `hint`        | —       | `string` <br> Helper text displayed below the input                                                                   |
| `limit`       | —       | `number` `string` <br> Maximum number of characters allowed                                                           |
| `expand`      | `false` | `boolean` <br> Makes the input expand to full width                                                                   |
| `placeholder` | —       | `string` <br> Placeholder text when input is empty                                                                    |
| `required`    | `false` | `boolean` <br> Makes the input required                                                                               |
| `modelValue`  | `''`    | `string` `number` <br> Value of the input (for v-model)                                                               |
| `readonly`    | `false` | `boolean` <br> Makes the input readonly                                                                               |
| `focus`       | `false` | `boolean` <br> Focuses the input when mounted                                                                         |
| `errors`      | `[]`    | `string[]` <br> Array of error messages to display                                                                    |
| `accept`      | —       | `string` <br> File types to accept (for file inputs)                                                                  |
| `multiple`    | `false` | `boolean` <br> Allows multiple file selection (for file inputs)                                                       |
| `min`         | —       | `number` <br> Minimum value (for number inputs)                                                                       |
| `max`         | —       | `number` <br> Maximum value (for number inputs)                                                                       |
| `disabled`    | `false` | `boolean` <br> Disables the input                                                                                     |

### Events

| Name                | Payload           | Description                          |
| ------------------- | ----------------- | ------------------------------------ |
| `update:modelValue` | `string` `number` | Emitted when the input value changes |

### Slots

| Name     | Accepts | Description                                             |
| -------- | ------- | ------------------------------------------------------- |
| `before` | `any`   | Content to be displayed before any of the input content |
| `start`  | `any`   | Content to be displayed at the start of the input       |
| `end`    | `any`   | Content to be displayed at the end of the input         |
| `after`  | `any`   | Content to be displayed after the all the input content |

### Exposes

| Name    | Type     | Description               |
| ------- | -------- | ------------------------- |
| `focus` | `method` | Focuses the input element |
