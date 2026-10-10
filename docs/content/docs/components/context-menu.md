# Context Menu

A context menu component that listens for right-click events on its content and displays a floating menu at the cursor's position. It uses the [Popout](/docs/components/popout) component which does not come with any default styles.

> Please note: components using popout ([Tooltip](/docs/components/tooltip), [Dropdown](/docs/components/dropdown) & [Popout](/docs/components/popout)) cannot be styled using `scoped` CSS in Vue SFC. However, you can just define a new `<style>` tag, style the popout inside and keep rest of your CSS scoped in a separate `<style scoped>`.

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

    <template #menu>
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

### Behavior

- **Opening** — Right click, the Menu key or `Shift+F10` (anchored to the focused element), or a long-press on touch devices, including iOS Safari which never fires `contextmenu`.
- **Keyboard** — Focus moves into the menu. `↑` / `↓`, `Home`, `End` and typeahead move between items. `→` opens a submenu built with [PopoutHover](/docs/components/popout-hover).
- **Closing** — Clicking an item, clicking outside or pressing `Esc`. Focus returns to where it was. Escape only closes the top-most layer, so a context menu inside a modal never closes the modal too.
- **Nesting** — With context menus nested inside each other, only the innermost one opens. Right-clicking inside an open menu keeps it open.
- **Positioning** — The menu opens at the cursor and stays correct inside scrolled containers.

### Props

| Name             | Default | Type                                                                            |
| ---------------- | ------- | ------------------------------------------------------------------------------- |
| `disabled`       | `false` | `boolean` <br> Keeps the browser's native context menu                          |
| `longPressDelay` | `500`   | `number` <br> How long a touch has to be held to open the menu, in milliseconds |

### Slots

| Name      | Accepts | Props               | Description                                                                                                     |
| --------- | ------- | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| `default` | `any`   | -                   | The content area that listens for right-click events                                                            |
| `menu`    | `any`   | `close: () => void` | The content rendered inside the floating menu (`role="menu"`). `DropdownItem` components close it automatically |

### Exposes

When queried via `useTemplateRef`, this component exposes

| Name    | Type     | Description     |
| ------- | -------- | --------------- |
| `close` | `method` | Closes the menu |
