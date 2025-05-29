# Progress

The Progress component is a flexible progress indicator that can be used to show loading states, file upload progress, or any other progress-related information. It supports both determinate and indeterminate states, and can be displayed as a fixed bar at the top of the page.

## Usage

```vue
<script setup lang="ts">
import { Progress } from '@dolanske/vui'
import { ref } from 'vue'

const progress = ref(0)
</script>

<template>
  <Progress v-model="progress" />
</template>
```

## Props

| Prop         | Type               | Default               | Description                                                 |
| ------------ | ------------------ | --------------------- | ----------------------------------------------------------- |
| `modelValue` | `number`           | `0`                   | The current progress value (0-100)                          |
| `fake`       | `boolean`          | `false`               | When true, will randomly increment but never reach 100%     |
| `color`      | `string`           | `var(--color-accent)` | The color of the progress indicator                         |
| `fixed`      | `boolean`          | `false`               | When true, displays the progress bar at the top of the page |
| `height`     | `number \| string` | -                     | The height of the progress bar                              |

## Events

| Event  | Description                            |
| ------ | -------------------------------------- |
| `done` | Emitted when the progress reaches 100% |

## Features

- Supports both determinate and indeterminate progress states
- Can be displayed as a fixed bar at the top of the page
- Customizable color and height
- Automatic clamping of progress values between 0 and 100
- Fake progress mode for loading states

## Examples

### Basic Progress

```vue
<script setup lang="ts">
import { Progress } from '@dolanske/vui'
import { ref } from 'vue'

const progress = ref(0)
</script>

<template>
  <Progress v-model="progress" />
</template>
```

### Fixed Progress Bar

```vue
<script setup lang="ts">
import { Progress } from '@dolanske/vui'
import { ref } from 'vue'

const progress = ref(0)
</script>

<template>
  <Progress v-model="progress" fixed />
</template>
```

### Custom Color

```vue
<script setup lang="ts">
import { Progress } from '@dolanske/vui'
import { ref } from 'vue'

const progress = ref(0)
</script>

<template>
  <Progress v-model="progress" color="var(--color-success)" />
</template>
```

### Fake Progress

```vue
<script setup lang="ts">
import { Progress } from '@dolanske/vui'
import { ref } from 'vue'

const progress = ref(0)
</script>

<template>
  <Progress v-model="progress" fake />
</template>
```

### Custom Height

```vue
<script setup lang="ts">
import { Progress } from '@dolanske/vui'
import { ref } from 'vue'

const progress = ref(0)
</script>

<template>
  <Progress v-model="progress" height="8px" />
</template>
```
