# Textarea

A multi-line text input component that extends the base Input component with textarea-specific functionality. It supports resizing, auto-resizing, and character limits.

::textarea-example

### Props

The Textarea component accepts all props from the base Input component, with the following additions:

| Name         | Default      | Type                                    | Description                                       |
| ------------ | ------------ | --------------------------------------- | ------------------------------------------------- |
| `resize`     | `'vertical'` | `boolean \| 'vertical' \| 'horizontal'` | Controls the resize behavior of the textarea      |
| `autoResize` | `false`      | `boolean`                               | Automatically adjusts the height based on content |

### With Label and Placeholder

```vue
<script setup>
import { Textarea } from '@dolanske/vui'
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <Textarea
    v-model="text"
    label="Description"
    placeholder="Enter your description"
  />
</template>
```

### With Character Limit

```vue
<script setup>
import { Textarea } from '@dolanske/vui'
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <Textarea
    v-model="text"
    label="Bio"
    :limit="280"
    placeholder="Tell us about yourself"
  />
</template>
```

### With Auto-resize

```vue
<script setup>
import { Textarea } from '@dolanske/vui'
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <Textarea
    v-model="text"
    label="Notes"
    auto-resize
    placeholder="Enter your notes"
  />
</template>
```

### With Custom Resize Behavior

```vue
<script setup>
import { Textarea } from '@dolanske/vui'
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <Textarea
    v-model="text"
    label="Content"
    resize="horizontal"
    placeholder="Enter content"
  />
</template>
```

### With Validation

```vue
<script setup>
import { Textarea } from '@dolanske/vui'
import { ref } from 'vue'

const text = ref('')
const errors = ref([])

function validateText(value) {
  errors.value = []
  if (value.length < 10) {
    errors.value.push('Text must be at least 10 characters long')
  }
}
</script>

<template>
  <Textarea
    v-model="text"
    label="Feedback"
    :errors="errors"
    @update:model-value="validateText"
  />
</template>
```
