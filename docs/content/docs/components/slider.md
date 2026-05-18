# Slider

A draggable input for selecting a numeric value within a defined range. Supports stepped increments, keyboard navigation, and a range mode for selecting a lower and upper bound simultaneously.

By default, slider does not round up the output.

::slider-example

```vue
<script setup>
import { Slider } from '@dolanske/vui'
import { ref } from 'vue'

const value = ref(40)
</script>

<template>
  <Slider v-model="value" />
</template>
```

::

### Props

| Name    | Default | Type                                                            |
| ------- | ------- | --------------------------------------------------------------- |
| `min`   | `0`     | `number` <br> Minimum output value                              |
| `max`   | `100`   | `number` <br> Maximum output value                              |
| `steps` | —       | `number` <br> Number of equal divisions between `min` and `max` |
| `range` | `false` | `boolean` <br> Enables range mode with a start and end handle   |

### Models

| Name         | Type     | Description                                              |
| ------------ | -------- | -------------------------------------------------------- |
| `modelValue` | `number` | Current value in single mode (`v-model`)                 |
| `start`      | `number` | Lower bound of the range in range mode (`v-model:start`) |
| `end`        | `number` | Upper bound of the range in range mode (`v-model:end`)   |

### Examples

Range mode with 10 steps. Both handles snap to step boundaries and cannot cross each other.

::slider-range-example

```vue
<script setup>
import { Slider } from '@dolanske/vui'
import { ref } from 'vue'

const start = ref(20)
const end = ref(80)
</script>

<template>
  <Slider v-model:start="start" v-model:end="end" range :steps="10" />
</template>
```

::
