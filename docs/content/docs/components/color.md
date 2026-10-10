# Color

A specialized input component for selecting colors. It combines a native color picker with a text input for direct color value entry.

The outer `label` belongs to the text input, which also receives `name`, `aria-*` and other attributes. The swatch opens the native picker. Partially typed values (like `#ff`) stay visible while typing but are only emitted once they form a complete color. Leaving the field with an incomplete value restores the last valid color.

::color-example{sourcePath="Input/Color.vue"}

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

The Color component accepts the props of the base [Input](/docs/components/input) component, except `type` and `modelValue`. The output format is controlled with a model modifier.

| Modifier              | Description                                                                     |
| --------------------- | ------------------------------------------------------------------------------- |
| `v-model="color"`     | **Hex** — (default) output value is a hex string, `#4CAF50` or shorthand `#fff` |
| `v-model.rgb="color"` | **RGB** — output value is an `rgb(r, g, b)` string e.g. `rgb(76, 175, 80)`      |
