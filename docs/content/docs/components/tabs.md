# Tabs

A tabs component that allows users to switch between different views or sections of content. It supports various styling options, icons, and can be used with or without a filled background.

::tabs-example

```vue
<script setup>
import { Tab, Tabs } from '@dolanske/vui'
import { ref } from 'vue'

const activeTab = ref('tab1')
</script>

<template>
  <Tabs v-model="activeTab">
    <Tab value="tab1" label="Tab 1" />
    <Tab value="tab2" label="Tab 2" />
    <Tab value="tab3" label="Tab 3" />
  </Tabs>

  <div class="mt-md">
    <div v-if="activeTab === 'tab1'">
      Content for Tab 1
    </div>
    <div v-if="activeTab === 'tab2'">
      Content for Tab 2
    </div>
    <div v-if="activeTab === 'tab3'">
      Content for Tab 3
    </div>
  </div>
</template>
```

::

### Props

#### Tabs Component

| Name       | Default   | Type                                                        |
| ---------- | --------- | ----------------------------------------------------------- |
| `variant`  | `default` | `default` `filled` <br> The visual style of the tabs        |
| `expand`   | `false`   | `boolean` <br> Whether the tabs should expand to full width |
| `disabled` | `false`   | `boolean` <br> Whether all tabs are disabled                |

#### Tab Component

| Name       | Default | Type                                               |
| ---------- | ------- | -------------------------------------------------- |
| `disabled` | `false` | `boolean` <br> Whether the tab is disabled         |
| `value`    | —       | `string` <br> The value of the tab                 |
| `label`    | —       | `string` <br> The label text to display in the tab |
| `icon`     | —       | `string` <br> Icon to display in the tab           |

### Events

| Name                | Payload  | Type                                |
| ------------------- | -------- | ----------------------------------- |
| `update:modelValue` | `string` | Emitted when the active tab changes |

### Slots

#### Tabs Component

| Name      | Accepts | Description                        |
| --------- | ------- | ---------------------------------- |
| `default` | `any`   | Tab components                     |
| `start`   | `any`   | Content to display before the tabs |
| `end`     | `any`   | Content to display after the tabs  |

#### Tab Component

| Name      | Accepts | Description                |
| --------- | ------- | -------------------------- |
| `default` | `any`   | Custom content for the tab |
