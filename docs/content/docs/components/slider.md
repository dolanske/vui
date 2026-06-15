# Slider

A draggable input for selecting a numeric value within a defined range. Supports stepped increments, keyboard navigation, and a range mode for selecting a lower and upper bound simultaneously.

By default, slider rounds output values to integers.

::slider-example{sourcePath="Slider/Slider.vue"}

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

| Name    | Default | Type                                                                                                                                    |
| ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `min`   | `0`     | `number` <br> Minimum output value                                                                                                      |
| `max`   | `100`   | `number` <br> Maximum output value                                                                                                      |
| `steps` | —       | `number` <br> Number of equal divisions between `min` and `max`                                                                         |
| `range` | `false` | `boolean` <br> Enables range mode with a start and end handle                                                                           |
| `round` | `true`  | `boolean \| number` <br> Round output values. `true` rounds to an integer, a number specifies decimal places, `false` disables rounding |

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

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                                | Default                                                   | Description            |
| ------------------------------------ | --------------------------------------------------------- | ---------------------- |
| `--vui-slider-height`                | `4px`                                                     | Track height           |
| `--vui-slider-background`            | [`var(--color-border)`](/docs/tokens/colors)              | Track background color |
| `--vui-slider-indicator`             | [`var(--color-accent)`](/docs/tokens/colors)              | Fill indicator color   |
| `--vui-slider-handle-size`           | `20px`                                                    | Handle diameter        |
| `--vui-slider-handle-rounding`       | [`var(--border-radius-pill)`](/docs/tokens/border-radius) | Handle border radius   |
| `--vui-slider-handle-color`          | [`var(--color-border-strong)`](/docs/tokens/colors)       | Handle border color    |
| `--vui-slider-step-indicator-width`  | `2px`                                                     | Step tick width        |
| `--vui-slider-step-indicator-height` | `4px`                                                     | Step tick height       |
