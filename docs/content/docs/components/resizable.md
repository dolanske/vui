# Resizable

A layout container that splits content into resizable panels separated by draggable handles. Supports horizontal and vertical layouts, keyboard navigation, and optional persistence of panel sizes.

::resizable-example{sourcePath="Resizable/Resizable.vue"}

```vue
<script setup>
import { Flex, Resizable } from '@dolanske/vui'
</script>

<template>
  <Resizable style="height: 200px;">
    <Flex x-center y-center>
      Panel 1
    </Flex>
    <Flex x-center y-center>
      Panel 2
    </Flex>
    <Flex x-center y-center>
      Panel 3
    </Flex>
  </Resizable>
</template>
```

::

### Props

| Name          | Default | Type                                                                                      |
| ------------- | ------- | ----------------------------------------------------------------------------------------- |
| `vertical`    | —       | `boolean` <br> Stacks panels vertically with horizontal handles                           |
| `storageKey`  | —       | `string` <br> When provided, panel sizes are persisted to `localStorage` under this key   |
| `hideHandles` | —       | `boolean` <br> Hides the resize handles until a handle is hovered or focused              |
| `minSize`     | —       | `number` <br> Minimum size, in pixels, each panel can be resized to along the active axis |

### Slots

| Name      | Props | Description                                                       |
| --------- | ----- | ----------------------------------------------------------------- |
| `default` | —     | The panel content. Each top-level child becomes a resizable panel |

### Examples

Use the `vertical` prop to stack panels with horizontal handles. The `minSize`
prop keeps every panel above a pixel threshold while dragging.

::resizable-vertical-example

```vue
<script setup>
import { Flex, Resizable } from '@dolanske/vui'
</script>

<template>
  <Resizable vertical :min-size="48" style="height: 320px;">
    <Flex x-center y-center>
      Top
    </Flex>
    <Flex x-center y-center>
      Middle
    </Flex>
    <Flex x-center y-center>
      Bottom
    </Flex>
  </Resizable>
</template>
```

::

Nest a `Resizable` inside another to build mixed horizontal and vertical
layouts. Each container can set its own `minSize`.

::resizable-mixed-example

```vue
<script setup>
import { Flex, Resizable } from '@dolanske/vui'
</script>

<template>
  <Resizable :min-size="120" style="height: 320px;">
    <Flex x-center y-center>
      Sidebar
    </Flex>
    <Resizable vertical :min-size="64">
      <Flex x-center y-center>
        Editor
      </Flex>
      <Flex x-center y-center>
        Terminal
      </Flex>
    </Resizable>
  </Resizable>
</template>
```

::
