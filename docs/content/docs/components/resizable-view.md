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

### Layout model

The model is a tree. Objects with `tabs` are panels, arrays are groups which alternate direction with their depth: the root is horizontal, its groups are vertical, their groups horizontal again, and so on. There is no depth limit.

```ts
const views = [
  panelA, // full height panel
  [panelB, panelC], // vertical split: B above C
  [[panelD, panelE], panelF], // vertical: (D | E) above F
]
```

The model is never mutated. Every change (moving, splitting, assigning panel ids) produces a new tree which is emitted through `update:modelValue`. Groups with a single child are unwrapped and empty panels are removed automatically.

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

### Types

```ts
interface ViewTab {
  path: string
  label?: string
}

interface Panel {
  // Assigned automatically when missing
  id?: string
  tabs: ViewTab[]
}

type ViewNode = Panel | ViewNode[]
```

### Tokens

| Token                         | Default                                    | Description                |
| ----------------------------- | ------------------------------------------ | -------------------------- |
| `--vui-resizable-view-height` | `512px`                                    | Height of the whole layout |
| `--vui-resizable-gap`         | [`var(--space-xxs)`](/docs/tokens/spacing) | Gap between panels         |
