**WORK IN PROGRESS - NOT READY**

# Resizable View

An editor-like layout of resizable panels with tabs, similar to VS Code. Tabs can be dragged between panels, reordered, or dropped onto a panel's content to split it. It is built on top of [Resizable](/docs/components/resizable) and [Tabs](/docs/components/tabs).

```vue
<script setup lang="ts">
import type { ViewNode } from '@dolanske/vui'
import { ResizableView } from '@dolanske/vui'
import { ref } from 'vue'

const views = ref<ViewNode[]>([
  { tabs: [{ path: 'index.ts' }, { path: 'App.vue' }] },
  [
    { tabs: [{ path: 'README.md' }] },
    { tabs: [{ path: 'package.json' }] },
  ],
])
</script>

<template>
  <ResizableView v-model="views" style="--vui-resizable-view-height: 600px">
    <template #tab="{ tab }">
      <pre>Contents of {{ tab.path }}</pre>
    </template>
  </ResizableView>
</template>
```

### Moving tabs

| Interaction                                   | Result                                                          |
| --------------------------------------------- | --------------------------------------------------------------- |
| Drag a tab onto another tab bar               | Moves or reorders the tab                                       |
| Drag a tab onto the edge of a panel's content | Splits the panel and places the tab in a new panel on that side |
| Drag a tab onto the center of a panel         | Appends the tab to that panel                                   |
| `Alt+←` / `Alt+→` on a focused tab            | Reorders the tab within its panel                               |
| `Alt+Shift+Arrow` on a focused tab            | Moves the tab into a new split on that side                     |

### Models

| Name         | Type         | Description     |
| ------------ | ------------ | --------------- |
| `modelValue` | `ViewNode[]` | The layout tree |

### Slots

| Name  | Props                            | Description                              |
| ----- | -------------------------------- | ---------------------------------------- |
| `tab` | `{ tab: ViewTab, panel: Panel }` | Content of the active tab of every panel |

### Tokens

| Token                         | Default                                    | Description                |
| ----------------------------- | ------------------------------------------ | -------------------------- |
| `--vui-resizable-view-height` | `512px`                                    | Height of the whole layout |
| `--vui-resizable-gap`         | [`var(--space-xxs)`](/docs/tokens/spacing) | Gap between panels         |
