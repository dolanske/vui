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

| Name         | Default | Type                                                                                    |
| ------------ | ------- | --------------------------------------------------------------------------------------- |
| `vertical`   | —       | `boolean` <br> Stacks panels vertically with horizontal handles                         |
| `storageKey` | —       | `string` <br> When provided, panel sizes are persisted to `localStorage` under this key |

### Slots

| Name      | Props | Description                                                       |
| --------- | ----- | ----------------------------------------------------------------- |
| `default` | —     | The panel content. Each top-level child becomes a resizable panel |
