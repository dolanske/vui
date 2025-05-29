# Popout

A flexible popout component that can be used to create tooltips, dropdowns, or any other floating content. It uses the Floating UI library for positioning and provides smooth animations.

::popout-example

```vue
<script setup>
import { Button, Popout } from '@dolanske/vui'
import { ref } from 'vue'

const isVisible = ref(false)
const anchorRef = ref(null)
</script>

<template>
  <div ref="anchorRef">
    <Button @click="isVisible = !isVisible">
      Toggle Popout
    </Button>
  </div>

  <Popout
    :anchor="anchorRef"
    :visible="isVisible"
    placement="bottom"
    @click-outside="isVisible = false"
  >
    <div class="p-md bg-white shadow-lg rounded">
      Popout content
    </div>
  </Popout>
</template>
```

::

### Props

| Name        | Type          | Default | Description                                             |
| ----------- | ------------- | ------- | ------------------------------------------------------- |
| `anchor`    | `HTMLElement` | -       | Reference to the HTML element the Popout is anchored to |
| `placement` | `Placement`   | `'top'` | Position of the popout relative to the anchor           |
| `offset`    | `number`      | `8`     | Distance between the anchor and the popout in pixels    |
| `visible`   | `boolean`     | -       | Whether the popout is visible                           |

### Events

| Name           | Type | Description                              |
| -------------- | ---- | ---------------------------------------- |
| `clickOutside` | -    | Emitted when clicking outside the popout |

### Features

- Automatic positioning and flipping
- Smooth animations based on placement
- Click outside detection
- Responsive to anchor element changes
- Support for all Floating UI placements

### Examples

#### Basic Popout

```vue
<script setup>
import { Button, Popout } from '@dolanske/vui'
import { ref } from 'vue'

const isVisible = ref(false)
const anchorRef = ref(null)
</script>

<template>
  <div ref="anchorRef">
    <Button @click="isVisible = !isVisible">
      Toggle Popout
    </Button>
  </div>

  <Popout
    :anchor="anchorRef"
    :visible="isVisible"
    placement="bottom"
    @click-outside="isVisible = false"
  >
    <div class="p-md bg-white shadow-lg rounded">
      Popout content
    </div>
  </Popout>
</template>
```

#### Custom Placement

```vue
<script setup>
import { Button, Popout } from '@dolanske/vui'
import { ref } from 'vue'

const isVisible = ref(false)
const anchorRef = ref(null)
</script>

<template>
  <div ref="anchorRef">
    <Button @click="isVisible = !isVisible">
      Toggle Popout
    </Button>
  </div>

  <Popout
    :anchor="anchorRef"
    :visible="isVisible"
    placement="right"
    :offset="16"
    @click-outside="isVisible = false"
  >
    <div class="p-md bg-white shadow-lg rounded">
      Popout with custom placement and offset
    </div>
  </Popout>
</template>
```
