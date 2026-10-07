# Menubar

A menubar component that renders a horizontal list of labeled menu triggers. Clicking a trigger opens its associated menu as a floating panel. Hovering over other triggers while any menu is open switches the active menu immediately, matching the native menubar UX.

The menubar follows the WAI-ARIA menubar pattern. Only one trigger is in the Tab order. `←` / `→` move between triggers (switching the open menu), `↓` opens a menu, `↑` / `↓` / `Home` / `End` and typeahead move between items, `←` / `→` inside a menu switch to the neighbouring menu and `Esc` closes the menu and returns focus to its trigger. Activating a `DropdownItem` closes the menu.

> The menu slot content is unstyled by default. Wrapping it in `<div class="vui-dropdown">` makes it visually consistent with the [Dropdown](/docs/components/dropdown) component.

::menubar-example{sourcePath="Menubar/Menubar.vue"}

```vue
<script setup lang="ts">
import { Button, Card, Divider, DropdownItem, Menubar, MenuItem } from '@dolanske/vui'
</script>

<template>
  <Menubar>
    <MenuItem>
      <Button plain size="s">
        File
      </Button>
      <template #menu>
        <div class="vui-dropdown">
          <DropdownItem size="s">
            New File
          </DropdownItem>
          <DropdownItem size="s">
            Open...
          </DropdownItem>
          <Divider class="my-xxxs" />
          <DropdownItem size="s" disabled>
            Exit
          </DropdownItem>
        </div>
      </template>
    </MenuItem>
    <MenuItem>
      <Button plain size="s">
        Edit
      </Button>
      <template #menu>
        <div class="vui-dropdown">
          <DropdownItem size="s">
            Undo
          </DropdownItem>
          <DropdownItem size="s">
            Redo
          </DropdownItem>
        </div>
      </template>
    </MenuItem>
  </Menubar>
</template>
```

::

### Menubar Props

Menubar passes all props down to the underlying [`Flex`](/docs/components/flex) component, so any flex layout props are supported. By default, it uses `gap=s` to space the top-level buttons.

### MenuItem Slots

| Name      | Accepts | Description                                                                                                     |
| --------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `default` | `any`   | The trigger element (typically a `Button` with size `s`)                                                        |
| `menu`    | `any`   | Content rendered inside [Popout](/docs/components/popout) (`role="menu"`) when item is active. Receives `close` |

`MenuItem` must be placed inside a `Menubar`, otherwise it throws a descriptive error.
