# Textarea

A multi-line text input component that extends the base Input component with textarea-specific functionality. It supports resizing, auto-resizing, and character limits.

::textarea-example

```vue
<script setup>
import { Textarea } from '@dolanske/vui'
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <Textarea
    v-model="text"
    expand
    label="Description"
    hint="Let me know what you think about vui"
    placeholder="Your text..."
    :limit="280"
    required
  />
</template>
```

::

### Props

| Name          | Default    | Type                                                                                |
| ------------- | ---------- | ----------------------------------------------------------------------------------- |
| `resize`      | `vertical` | `boolean` `vertical` `horizontal` <br> Controls the resize behavior of the textarea |
| `cols`        | -          | `number` <br> Modifies the width of the textarea in character count                 |
| `rows`        | `5`        | `number` <br> Modifies the height of the textarea in row cou                        |
| `autoResize`  | `false`    | `boolean` <br> Automatically adjusts the height based on content                    |
| `label`       | —          | `string` <br> Label text for the textarea                                           |
| `hint`        | —          | `string` <br> Helper text displayed below the textarea                              |
| `limit`       | —          | `number` `string` <br> Maximum number of characters allowed                         |
| `expand`      | `false`    | `boolean` <br> Makes the textarea expand to full width                              |
| `placeholder` | —          | `string` <br> Placeholder text when textarea is empty                               |
| `required`    | `false`    | `boolean` <br> Makes the textarea required                                          |
| `modelValue`  | `''`       | `string` <br> Value of the textarea (for v-model)                                   |
| `readonly`    | `false`    | `boolean` <br> Makes the textarea readonly                                          |
| `focus`       | `false`    | `boolean` <br> Focuses the textarea when mounted                                    |
| `errors`      | `[]`       | `string[]` <br> Array of error messages to display                                  |
| `disabled`    | `false`    | `boolean` <br> Disables the textarea                                                |

### Events

| Name                | Payload  | Description                             |
| ------------------- | -------- | --------------------------------------- |
| `update:modelValue` | `string` | Emitted when the textarea value changes |

### Slots

| Name     | Accepts | Description                                                |
| -------- | ------- | ---------------------------------------------------------- |
| `before` | `any`   | Content to be displayed before any of the textarea content |
| `start`  | `any`   | Content to be displayed at the start of the textarea       |
| `end`    | `any`   | Content to be displayed at the end of the textarea         |
| `after`  | `any`   | Content to be displayed after all the textarea content     |

### Exposes

| Name    | Type     | Description                  |
| ------- | -------- | ---------------------------- |
| `focus` | `method` | Focuses the textarea element |
