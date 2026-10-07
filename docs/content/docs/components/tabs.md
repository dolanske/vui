# Tabs

A tabs component that allows users to switch between different views or sections of content. It supports two styles, `default` and `filled`, and optional `TabPanel` components for the content.

The list is a `role="tablist"` with a single Tab stop. `←` / `→` (or `↑` / `↓`), `Home` and `End` move between tabs and select them, skipping disabled ones. Tabs can be nested inside other elements or behind `v-if`.

::tabs-example{sourcePath="Tabs/Tabs.vue"}

```vue
<script setup>
import { Tab, TabPanel, Tabs } from '@dolanske/vui'
import { ref } from 'vue'

const activeTab = ref('tab1')
</script>

<template>
  <Tabs id="settings-tabs" v-model="activeTab">
    <Tab value="tab1">
      Tab 1
    </Tab>
    <Tab value="tab2">
      Tab 2
    </Tab>
    <Tab value="tab3" disabled>
      Tab 3
    </Tab>
  </Tabs>

  <TabPanel tabs="settings-tabs" value="tab1" :active="activeTab">
    Content for Tab 1
  </TabPanel>
  <TabPanel tabs="settings-tabs" value="tab2" :active="activeTab">
    Content for Tab 2
  </TabPanel>
</template>
```

::

### Props

#### Tabs Component

| Name              | Default   | Type                                                                                                   |
| ----------------- | --------- | ------------------------------------------------------------------------------------------------------ |
| `variant`         | `default` | `default` `filled` <br> The visual style of the tabs                                                   |
| `expand`          | `false`   | `boolean` <br> Whether the tabs should expand to full width                                            |
| `disabled`        | `false`   | `boolean` <br> Whether all tabs are disabled                                                           |
| `id`              | —         | `string` <br> Id of the tab list. Setting it links every Tab with its TabPanel through `aria-controls` |
| `transition-name` | `fade`    | `string` `none` <br> Transition of the active tab underline. `none` disables it                        |

When the active value matches no tab (or none is set), the first enabled tab is selected.

#### Tab Component

| Name       | Default | Type                                                               |
| ---------- | ------- | ------------------------------------------------------------------ |
| `value`    | —       | `string` <br> The value of the tab, also shown when no slot is set |
| `disabled` | `false` | `boolean` <br> Whether the tab is disabled and can not be selected |

#### TabPanel Component

| Name          | Default | Type                                                                                    |
| ------------- | ------- | --------------------------------------------------------------------------------------- |
| `tabs`        | —       | `string` <br> The `id` of the Tabs component this panel belongs to                      |
| `value`       | —       | `string` <br> Value of the Tab which shows this panel                                   |
| `active`      | —       | `string` <br> The currently active value, usually the ref bound to the Tabs `v-model`   |
| `keepMounted` | `false` | `boolean` <br> Keeps the panel rendered but hidden while inactive, preserving its state |

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

#### TabPanel Component

| Name      | Accepts | Description          |
| --------- | ------- | -------------------- |
| `default` | `any`   | Content of the panel |

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                            | Default                                      | Description                    |
| -------------------------------- | -------------------------------------------- | ------------------------------ |
| `--vui-tabs-height`              | `40px`                                       | Tab bar height                 |
| `--vui-tabs-item-padding-inline` | `10px`                                       | Tab item horizontal padding    |
| `--vui-tabs-underline-color`     | [`var(--color-text)`](/docs/tokens/colors)   | Active tab underline color     |
| `--vui-tabs-gap`                 | `4px`                                        | Gap between tab items          |
| `--vui-tabs-underline-size`      | `2px`                                        | Active tab underline thickness |
| `--vui-tabs-border-color`        | [`var(--color-border)`](/docs/tokens/colors) | Tab bar bottom border color    |
