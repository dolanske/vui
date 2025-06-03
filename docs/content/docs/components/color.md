# Color Input

A specialized input component for selecting colors. It combines a color picker with a text input for direct color value entry. It accepts

::color-example

```vue
<script setup>
import { Color } from '@dolanske/vui'
import { ref } from 'vue'

const color = ref('#4CAF50')
</script>

<template>
  <Color
    v-model="color"
    hint="Choose your favorite color please"
    label="Theme color"
  />
</template>
```

::

### Usage

The Color component inherits all functionality from the base [Input](/docs/components/input) component.
