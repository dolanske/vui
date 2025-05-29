# Color Input

A specialized input component for selecting colors. It combines a color picker with a text input for direct color value entry.

::color-example

### Props

The Color component accepts all props from the base Input component.

### With Label and Placeholder

```vue
<script setup>
import { Color } from '@dolanske/vui'
import { ref } from 'vue'

const color = ref('#000000')
</script>

<template>
  <Color
    v-model="color"
    label="Background Color"
    placeholder="Enter hex color"
  />
</template>
```

### With Default Value

```vue
<script setup>
import { Color } from '@dolanske/vui'
import { ref } from 'vue'

const color = ref('#4CAF50')
</script>

<template>
  <Color
    v-model="color"
    label="Theme Color"
  />
</template>
```

### With Validation

```vue
<script setup>
import { Color } from '@dolanske/vui'
import { ref } from 'vue'

const color = ref('#000000')
const error = ref('')

function validateColor(value) {
  if (!value.match(/^#[0-9A-F]{6}$/i)) {
    error.value = 'Please enter a valid hex color code'
  }
  else {
    error.value = ''
  }
}
</script>

<template>
  <Color
    v-model="color"
    label="Color"
    :error="error"
    @update:model-value="validateColor"
  />
</template>
```
