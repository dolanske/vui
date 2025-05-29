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

## Components

### Tabs

The main tabs container component.

#### Props

| Name       | Type                    | Default     | Description                                  |
| ---------- | ----------------------- | ----------- | -------------------------------------------- |
| `variant`  | `'default' \| 'filled'` | `'default'` | The visual style of the tabs                 |
| `expand`   | `boolean`               | `false`     | Whether the tabs should expand to full width |
| `disabled` | `boolean`               | `false`     | Whether all tabs are disabled                |

#### Slots

| Name      | Description                        |
| --------- | ---------------------------------- |
| `default` | Tab components                     |
| `start`   | Content to display before the tabs |
| `end`     | Content to display after the tabs  |

### Tab

A single tab component.

#### Props

| Name       | Type      | Default | Description                 |
| ---------- | --------- | ------- | --------------------------- |
| `disabled` | `boolean` | `false` | Whether the tab is disabled |
| `value`    | `string`  | -       | The value of the tab        |
| `icon`     | `string`  | -       | Icon to display in the tab  |

#### Slots

| Name      | Description                |
| --------- | -------------------------- |
| `default` | Custom content for the tab |

## Events

| Name                | Description                         |
| ------------------- | ----------------------------------- |
| `update:modelValue` | Emitted when the active tab changes |

## Examples

### Basic Tabs

```vue
<template>
  <Tabs v-model="activeTab">
    <Tab value="tab1" label="Tab 1" />
    <Tab value="tab2" label="Tab 2" />
    <Tab value="tab3" label="Tab 3" />
  </Tabs>
</template>
```

### Filled Tabs

```vue
<template>
  <Tabs v-model="activeTab" variant="filled">
    <Tab value="tab1" label="Tab 1" />
    <Tab value="tab2" label="Tab 2" />
    <Tab value="tab3" label="Tab 3" />
  </Tabs>
</template>
```

### Tabs with Icons

```vue
<template>
  <Tabs v-model="activeTab">
    <Tab value="tab1" label="Home" icon="ph:house" />
    <Tab value="tab2" label="Settings" icon="ph:gear" />
    <Tab value="tab3" label="Profile" icon="ph:user" />
  </Tabs>
</template>
```

### Custom Content Tabs

```vue
<template>
  <Tabs v-model="activeTab">
    <Tab value="tab1">
      <div class="custom-tab">
        <Icon icon="ph:house" />
        <span>Home</span>
        <Badge>New</Badge>
      </div>
    </Tab>
    <Tab value="tab2">
      <div class="custom-tab">
        <Icon icon="ph:gear" />
        <span>Settings</span>
      </div>
    </Tab>
  </Tabs>
</template>
```

### Expanded Tabs

```vue
<script setup>
import { Tab, Tabs } from '@dolanske/vui'
import { ref } from 'vue'

const activeTab = ref('tab1')
</script>

<template>
  <Tabs v-model="activeTab" expand>
    <Tab value="tab1" label="Tab 1" />
    <Tab value="tab2" label="Tab 2" />
    <Tab value="tab3" label="Tab 3" />
  </Tabs>
</template>
```
