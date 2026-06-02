# Context Menu

A context menu component that listens for right-click events on its content and displays a floating menu at the cursor's position. It uses the [Popout](/docs/components/popout) component which does not come with any default styles.

> Plese note: components using popout ([Tooltip](/docs/components/tooltip), [Dropdown](/docs/components/dropdown) & [Popout](/docs/components/popout)) cannot be styled using `scoped` CSS in Vue SFC. However, you can just define a new `<style>` tag, style the popout inside and keep rest of your CSS scoped in a separate `<style scoped>`.

::context-menu-example{sourcePath="ContextMenu/ContextMenu.vue"}
```vue
<script setup lang="ts">
import { Card, ContextMenu, DropdownItem } from '@dolanske/vui'
</script>

<template>
  <ContextMenu>
    <Card separators>
      <template #header>
        <h4>Right click anywhere</h4>
      </template>
      <p class="text-color-light">
        Right click anywhere on this card to open a context menu with a set of actions. You can close it by clicking outside or by pressing the Escape key.
      </p>
    </Card>

    <template #popout>
      <div class="p-xxs">
        <DropdownItem>New user</DropdownItem>
        <DropdownItem>Update</DropdownItem>
        <DropdownItem>Delete</DropdownItem>
      </div>
    </template>
  </ContextMenu>
</template>
```

::

### Slots

| Name      | Accepts | Description                                                  |
| --------- | ------- | ------------------------------------------------------------ |
| `default` | `any`   | The content area that listens for right-click events         |
| `menu`    | `any`   | The content rendered inside the floating context menu popout |
