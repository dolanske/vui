# Sidebar

A responsive sidebar component that can be used for navigation, menus, or any other content that needs to be displayed in a side panel. It supports both full-width and mini modes, and can be configured to appear on hover.

Please note, Sidebar must always be placed within a `<div class="vui-sidebar-layout" />` element. Similar to [Drawer](/docs/components/drawer)

::sidebar-example{sourcePath="Sidebar/Sidebar.vue"}

```vue
<script>
import { Button, DropdownItem, Flex, Sidebar } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(true)
</script>

<template>
  <div class="vui-sidebar-layout" :style="{ height: '512px' }">
    <Sidebar :mini="!isOpen">
      <template #header>
        <img src="https://dolansky.dev/backgrounds/star.png" class="sidebar-logo" width="40" alt="" style="filter: invert(1);">
      </template>
      <DropdownItem>
        <template #icon>
          <IconHouse />
        </template>
        Home
      </DropdownItem>
      <DropdownItem>
        <template #icon>
          <IconUser />
        </template>
        About
      </DropdownItem>
      <DropdownItem>
        <template #icon>
          <IconPhone />
        </template>
        Contact
      </DropdownItem>
      <template #footer>
        <Flex y-center x-centerd>
          <Avatar v-show="isOpen" size="m" />
          <span v-show="isOpen" class="flex-1">dolanske</span>
          <Button plain size="s">
            <IconSignOut />
          </Button>
        </Flex>
      </template>
    </Sidebar>
    <main class="p-xl">
      <Flex y-center class="mb-l">
        <Button plain size="s" @click="isOpen = !isOpen">
          <IconSidebarSimple />
        </Button>
        <h4 style="margin: 0;">
          My page
        </h4>
      </Flex>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque deleniti asperiores quibusdam et commodi deserunt libero officia doloremque. Possimus ipsum sunt odit culpa consequatur hic reiciendis doloremque consequuntur tempore excepturi?</p>
      <hr>
      <p>Yes that's correct</p>
      <ul>
        <li>Secure</li>
        <li>Reliant</li>
        <li>Ublumf</li>
      </ul>
    </main>
  </div>
</template>
```

::

### Props

| Name                | Default   | Type                                                                                                          |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| `variant`           | `default` | `default` `plain` `card` <br> Determines the look of the sidebar                                              |
| `mini`              | `false`   | `boolean` <br> Controls wether the sidebar is displayed in full size, or a small version.                     |
| `appear`            | `false`   | `boolean` <br> If enabled, sidebar floats on top of content when opened.                                      |
| `float`             | `false`   | `boolean` <br> Whether to add edges of background around the sidebar                                          |
| `no-auto-transform` | `false`   | `boolean` <br> When set, it removes automatic transform of some VUI components when placed inside the Sidebar |

### Events

Sidebar is controlled via `v-model`, because it can also close itself and this change should be propagated to the parent.

| Name                | Payload | Description                                   |
| ------------------- | ------- | --------------------------------------------- |
| `update:modelValue` | —       | Emitted when the sidebar's open state changes |

### Slots

All slots expose the same properties, which allow the UI to control the state of the Sidebar.

| Name      | Accepts         | Description                                     |
| --------- | --------------- | ----------------------------------------------- |
| `default` | `SidebarExpose` | Main content of the sidebar                     |
| `header`  | `SidebarExpose` | Content to display at the top of the sidebar    |
| `footer`  | `SidebarExpose` | Content to display at the bottom of the sidebar |

```ts
interface SidebarExpose {
  mini: Ref<boolean>
  float: Ref<boolean>
  appear: Ref<boolean>
  width: Ref<number>
  noAutoTransform: Ref<number>
  open: Ref<boolean>
  close: () => void
}
```

### Examples

::sidebar-floaty-example

```vue
<script setup>
import { Sidebar } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(true)
</script>

<template>
  <div class="vui-sidebar-layout">
    <Sidebar appear float :style="{ '--vui-sidebar-width-full': '156px' }">
      <template #header>
        <img
          src="https://dolansky.dev/backgrounds/star.png"
          class="sidebar-logo"
          width="40"
        >
      </template>
      <DropdownItem>
        <template #icon>
          <IconHouse />
        </template>
        Home
      </DropdownItem>
      <DropdownItem>
        <template #icon>
          <IconUser />
        </template>
        About
      </DropdownItem>
      <DropdownItem>
        <template #icon>
          <IconPhone />
        </template>
        Contact
      </DropdownItem>
    </Sidebar>
  </div>
</template>
```

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                  | Default | Description                       |
| ---------------------- | ------- | --------------------------------- |
| `--vui-sidebar-offset` | `8px`   | Offset for floating sidebar edges |
| `--vui-sidebar-width`  | `224px` | Sidebar width                     |
