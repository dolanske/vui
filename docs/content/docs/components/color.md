# Color

A specialized input component for selecting colors. It combines a native color picker with a text input for direct color value entry.

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

The Color component inherits props / slots / events from the base [Input](/docs/components/input) component, with only exception being the following model modifiers.

| Modifier              | Description                                                                |
| --------------------- | -------------------------------------------------------------------------- |
| `v-model="color"`     | **Hex** — (default) output value is a hex string e.g. `#4CAF50`            |
| `v-model.rgb="color"` | **RGB** — output value is an `rgb(r, g, b)` string e.g. `rgb(76, 175, 80)` |
