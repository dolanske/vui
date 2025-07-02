# Progress

The Progress component is a flexible progress indicator that can be used to show loading states, file upload progress, or any other progress-related information. It supports both determinate and indeterminate states, and can be displayed as a fixed bar at the top of the page.

::progress-example

```vue
<script setup>
import { Progress } from '@dolanske/vui'
import { ref } from 'vue'

const progress = ref(50)
</script>

<template>
  <Progress v-model="progress" />
</template>
```

::

### Props

| Name     | Default               | Type                                                                    |
| -------- | --------------------- | ----------------------------------------------------------------------- |
| `fake`   | —                     | `boolean` <br> Will randomly increment but never actually reach the end |
| `color`  | `var(--color-accent)` | `string` <br> Indicator color. Use CSS color values or variables        |
| `fixed`  | —                     | `boolean` <br> Displays loader at the top of the page                   |
| `height` | —                     | `number` `string` <br> Height of the progress bar                       |

### Events

| Name   | Payload | Type                                   |
| ------ | ------- | -------------------------------------- |
| `done` | —       | Emitted when the progress reaches 100% |

### Examples

The following example shows different variations of the progress component.

::progress-advanced-example

```vue
<script setup>
import { Button, Progress, Flex } from '@dolanske/vui'
import { ref } from 'vue'

const progress = ref(0)
const fakeProgress = ref(0)

function increment() {
  progress.value = Math.min(100, progress.value + 25)
}
</script>

<template>
   <Flex column gap="l">
    <div class="w-100">
      <Flex class="mt-s" gap="s">
        <Button @click="increment">
          Add 16%
        </Button>
        <Button @click="progress = 0">
          Reset
        </Button>
      </Flex>
    </div>

    <!-- Fixed Progress -->
    <div class="w-100">
      <h6 class="mb-s">
        Fixed Progress (top of page)
      </h6>
      <Progress v-model="progress" fixed />
    </div>

    <!-- Custom Color -->
    <div class="w-100">
      <h6 class="mb-s">
        Custom Color
      </h6>
      <Progress v-model="progress" color="var(--color-text-green)" />
    </div>

    <!-- Fake Progress -->
    <div class="w-100">
      <h6 class="mb-s">
        Fake Progress
      </h6>
      <Progress v-model="fakeProgress" fake />
    </div>

    <!-- Custom Height -->
    <div class="w-100">
      <h6 class="mb-s">
        Custom Height
      </h6>
      <Progress v-model="progress" height="8px" />
    </div>
  </Flex>``
</template>
```

::

