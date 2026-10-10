# Resizable

A layout container that splits content into resizable panels separated by draggable handles. Supports horizontal and vertical layouts, mouse, touch and pen dragging, keyboard navigation, per panel limits, `v-model` sizes and optional persistence of panel sizes.

Handles are focusable `role="separator"` elements announcing the size of the panel before them. With a handle focused, the arrow keys resize in steps of 5%, `Home` / `End` collapse or expand the panel as far as its limits allow. Double click a handle to split the space equally. While dragging, panel content (like iframes) can not swallow pointer events.

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

| Name          | Default  | Type                                                                                                            |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `vertical`    | —        | `boolean` <br> Stacks panels vertically with horizontal handles                                                 |
| `storageKey`  | —        | `string` <br> When provided, panel sizes are persisted to `localStorage` under this key                         |
| `hideHandles` | —        | `boolean` <br> Hides the resize handles until a handle is hovered or focused                                    |
| `minSize`     | —        | `number` <br> Minimum size, in pixels, each panel can be resized to along the active axis                       |
| `panels`      | —        | `{ minSize?: number, maxSize?: number }[]` <br> Per panel limits in pixels, in panel order. Overrides `minSize` |
| `handleLabel` | `Resize` | `string` <br> Accessible label of the resize handles                                                            |

### Models

| Name    | Type       | Description                                                              |
| ------- | ---------- | ------------------------------------------------------------------------ |
| `sizes` | `number[]` | Panel sizes in percent (`v-model:sizes`). Updated when a resize finishes |

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
