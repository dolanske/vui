# Textarea

A multi-line text input component that shares its features with the base Input component. It supports resizing, auto-resizing, and character limits.

Attributes and listeners are forwarded to the native `<textarea>`, while `class` and `style` stay on the wrapper. `hint`, `errors` and `limit` are linked with `aria-describedby`.

::textarea-example{sourcePath="Input/Textarea.vue"}

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
    name="feedback"
    label="Description"
    hint="Let me know what you think about vui"
    placeholder="Your text..."
    :limit="280"
    auto-resize
    required
  />
</template>
```

::

### Props

| Name          | Default    | Type                                                                                     |
| ------------- | ---------- | ---------------------------------------------------------------------------------------- |
| `resize`      | `vertical` | `boolean` `vertical` `horizontal` <br> Controls manual resizing. `false` disables it     |
| `autoResize`  | `false`    | `boolean` <br> Grows the textarea with its content. `rows` is kept as the minimum height |
| `cols`        | -          | `number` <br> Modifies the width of the textarea in character count                      |
| `rows`        | `5`        | `number` <br> Modifies the height of the textarea in rows                                |
| `name`        | —          | `string` <br> Native `name` used for form submission                                     |
| `label`       | —          | `string` <br> Label text for the textarea                                                |
| `hint`        | —          | `string` <br> Helper text displayed between the label and the textarea                   |
| `limit`       | —          | `number` `string` <br> Maximum number of characters, enforced with `maxlength`           |
| `expand`      | `false`    | `boolean` <br> Makes the textarea expand to full width                                   |
| `placeholder` | —          | `string` <br> Placeholder text when textarea is empty                                    |
| `required`    | `false`    | `boolean` <br> Makes the textarea required                                               |
| `modelValue`  | `''`       | `string` <br> Value of the textarea (for v-model)                                        |
| `readonly`    | `false`    | `boolean` <br> Makes the textarea readonly                                               |
| `focus`       | `false`    | `boolean` <br> Focuses the textarea whenever it becomes `true`                           |
| `errors`      | `[]`       | `string[]` <br> Array of error messages to display                                       |
| `disabled`    | `false`    | `boolean` <br> Disables the textarea                                                     |

### Events

| Name                | Payload  | Description                             |
| ------------------- | -------- | --------------------------------------- |
| `update:modelValue` | `string` | Emitted when the textarea value changes |

### Slots

| Name     | Accepts | Description                                                |
| -------- | ------- | ---------------------------------------------------------- |
| `before` | `any`   | Content to be displayed before any of the textarea content |
| `after`  | `any`   | Content to be displayed after all the textarea content     |

### Exposes

When queried via `useTemplateRef`, this component exposes

| Name    | Type     | Description                  |
| ------- | -------- | ---------------------------- |
| `focus` | `method` | Focuses the textarea element |
