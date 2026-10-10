# Sidebar

A responsive sidebar component that can be used for navigation, menus, or any other content that needs to be displayed in a side panel. It supports both full-width and mini modes, can float over the content, and can be configured to appear when the screen edge is hovered.

Please note, Sidebar must always be placed within a `<div class="vui-sidebar-layout" />` element.

The sidebar is an `<aside>` landmark named with the `label` prop.

::sidebar-example{sourcePath="Sidebar/Sidebar.vue"}

```vue
<script setup>
import { Avatar, Button, DropdownItem, Flex, Sidebar } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(true)
</script>

<template>
  <div class="vui-sidebar-layout" :style="{ height: '512px' }">
    <Sidebar :mini="!isOpen">
      <template #header>
        <img src="https://dolansky.dev/backgrounds/star.png" class="sidebar-logo" width="40" alt="" style="filter: invert(1);">
      </template>
      <DropdownItem href="/">
        <template #icon>
          <IconHouse />
        </template>
        Home
      </DropdownItem>
      <DropdownItem href="/about">
        <template #icon>
          <IconUser />
        </template>
        About
      </DropdownItem>
      <DropdownItem href="/contact">
        <template #icon>
          <IconPhone />
        </template>
        Contact
      </DropdownItem>
      <template #footer>
        <Flex y-center x-center>
          <Avatar v-show="isOpen" size="m" />
          <span v-show="isOpen" class="flex-1">dolanske</span>
          <Button plain size="s" square aria-label="Sign out">
            <IconSignOut />
          </Button>
        </Flex>
      </template>
    </Sidebar>
    <main class="p-xl">
      <Flex y-center class="mb-l">
        <Button plain size="s" square aria-label="Toggle sidebar" @click="isOpen = !isOpen">
          <IconSidebarSimple />
        </Button>
        <h4 style="margin: 0;">
          My page
        </h4>
      </Flex>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
    </main>
  </div>
</template>
```

::

### Props

| Name                | Default   | Type                                                                                                                        |
| ------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `variant`           | `default` | `default` `plain` `card` <br> Determines the look of the sidebar                                                            |
| `mini`              | `false`   | `boolean` <br> Controls whether the sidebar is displayed in full size, or a small version                                   |
| `float`             | `false`   | `boolean` <br> The sidebar floats on top of the content when opened. `Esc` and clicking outside close it                    |
| `appear`            | `false`   | `boolean` <br> The sidebar stays hidden until the screen edge is hovered, touched, or focus moves into it with the keyboard |
| `appearDelay`       | `250`     | `number` <br> How long the edge has to be hovered before the sidebar appears, in milliseconds                               |
| `no-auto-transform` | `false`   | `boolean` <br> When set, it removes automatic transform of some VUI components when placed inside the Sidebar               |
| `label`             | `Sidebar` | `string` <br> Accessible name of the sidebar landmark                                                                       |

### Events

Sidebar is controlled via `v-model`, because it can also close itself and this change should be propagated to the parent.

| Name                | Payload   | Description                                   |
| ------------------- | --------- | --------------------------------------------- |
| `update:modelValue` | `boolean` | Emitted when the sidebar's open state changes |

### Slots

All slots expose the same properties, which allow the UI to control the state of the Sidebar.

| Name      | Accepts         | Description                                     |
| --------- | --------------- | ----------------------------------------------- |
| `default` | `SidebarExpose` | Main content of the sidebar                     |
| `header`  | `SidebarExpose` | Content to display at the top of the sidebar    |
| `footer`  | `SidebarExpose` | Content to display at the bottom of the sidebar |

```ts
interface SidebarExpose {
  mini: boolean
  float: boolean
  appear: boolean
  noAutoTransform: boolean
  open: Ref<boolean>
  close: () => void
}
```

### Examples

::sidebar-floaty-example

```vue
<script setup>
import { DropdownItem, Sidebar } from '@dolanske/vui'
</script>

<template>
  <div class="vui-sidebar-layout">
    <Sidebar appear float :style="{ '--vui-sidebar-width-full': '156px' }">
      <template #header>
        <img
          src="https://dolansky.dev/backgrounds/star.png"
          class="sidebar-logo"
          width="40"
          alt=""
        >
      </template>
      <DropdownItem href="/">
        <template #icon>
          <IconHouse />
        </template>
        Home
      </DropdownItem>
      <DropdownItem href="/about">
        <template #icon>
          <IconUser />
        </template>
        About
      </DropdownItem>
    </Sidebar>
  </div>
</template>
```

::

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                      | Default | Description                       |
| -------------------------- | ------- | --------------------------------- |
| `--vui-sidebar-offset`     | `8px`   | Offset for floating sidebar edges |
| `--vui-sidebar-width-full` | `224px` | Sidebar width                     |
| `--vui-sidebar-width-mini` | `68px`  | Sidebar width in `mini` mode      |
