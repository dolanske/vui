# Sidebar

A responsive sidebar component that can be used for navigation, menus, or any other content that needs to be displayed in a side panel. It supports both full-width and mini modes, and can be configured to appear on hover.

Please note, Sidebar must always be placed within a `<div class="vui-sidebar-layout" />` element. Similar to [Drawer](/docs/components/drawer)

::sidebar-example

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

| Name     | Default | Type                                                                                     |
| -------- | ------- | ---------------------------------------------------------------------------------------- |
| `width`  | `224`   | `number` <br> Width of the sidebar in pixels when in full mode                           |
| `mini`   | `false` | `boolean` <br> Whether to display the sidebar in mini mode (collapsed)                   |
| `appear` | `false` | `boolean` <br> Whether the sidebar should appear on hover at the left edge of the screen |
| `floaty` | `false` | `boolean` <br> Whether to add edges of background around the sidebar                     |

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
  floaty: Ref<boolean>
  width: Ref<number>
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
    <Sidebar appear :width="128" floaty>
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
