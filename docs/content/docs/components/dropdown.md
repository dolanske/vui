# Dropdown

A dropdown menu component that provides a flexible way to display a list of options or actions. It supports various features like positions, hints, titles, submenus and custom content.

> Please note: components using popout ([Tooltip](/docs/components/tooltip), [Dropdown](/docs/components/dropdown) & [Popout](/docs/components/popout)) cannot be styled using `scoped` CSS in Vue SFC. However, you can just define a new `<style>` tag, style the popout inside and keep rest of your CSS scoped in a separate `<style scoped>`.

::dropdown-example{sourcePath="Dropdown/Dropdown.vue"}

```vue
<script setup lang="ts">
import { Button, Dropdown, DropdownItem, DropdownTitle } from '@dolanske/vui'
import { IconCaretRight, IconCommand, IconX } from '@iconify-prerendered/vue-ph'
</script>

<template>
  <Dropdown>
    <template #trigger="{ toggle }">
      <Button variant="fill" @click="toggle">
        Menu
      </Button>
    </template>
    <DropdownTitle>
      Actions
      <template #end>
        3
      </template>
    </DropdownTitle>

    <DropdownItem>
      New user
      <template #hint>
        <IconCommand />
        + C
      </template>
    </DropdownItem>
    <DropdownItem>
      Update
      <template #iconEnd>
        <IconCaretRight />
      </template>
    </DropdownItem>
    <DropdownItem disabled>
      <template #icon>
        <IconX />
      </template>
      Delete
    </DropdownItem>
  </Dropdown>
</template>
```

::

### Accessibility

The popup is a `role="menu"` and every `DropdownItem` a `menuitem`. The trigger gets `aria-haspopup`, `aria-expanded` and `aria-controls` automatically.

| Key                  | Action                                                                           |
| -------------------- | -------------------------------------------------------------------------------- |
| `↓` / `↑` on trigger | Opens the menu and focuses the first / last item                                 |
| `↓` / `↑`            | Moves between items, skipping disabled ones                                      |
| `Home` / `End`       | First / last item                                                                |
| Letters              | Typeahead, focuses the next item starting with the typed text                    |
| `→`                  | Opens a submenu built with [PopoutHover](/docs/components/popout-hover)          |
| `←`                  | Closes a submenu and returns to its item                                         |
| `Esc`                | Closes the menu and returns focus to the trigger. Only the top-most layer closes |
| `Tab`                | Leaves and closes the menu                                                       |

Activating an item closes the menu and returns focus to the trigger. Clicking elsewhere closes the menu without moving focus.

On small touch screens the menu opens in a [Drawer](/docs/components/drawer) instead, unless `noMobileDrawer` is set. Narrow desktop windows keep the floating menu.

### Props

| Name              | Default        | Type                                                                                                                                                                                                                                                                                                                                                 |
| ----------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placement`       | `bottom-start` | `top` `right` `bottom` `left` `top-start` `top-end` `right-start` `right-end` `bottom-start` `bottom-end` `left-start` `left-end` <br> Position of the dropdown relative to the trigger                                                                                                                                                              |
| `minWidth`        | `156`          | `number` `string` <br> Minimum width of the dropdown in pixels or CSS units                                                                                                                                                                                                                                                                          |
| `maxHeight`       | `356`          | `number` `string` <br> Maximum height of the dropdown before scrolling in pixels or CSS units                                                                                                                                                                                                                                                        |
| `matchWidth`      | `false`        | `boolean` <br> Makes the dropdown at least as wide as its trigger                                                                                                                                                                                                                                                                                    |
| `role`            | `menu`         | `menu` `listbox` `dialog` <br> ARIA role of the popup. Use `dialog` for arbitrary interactive content like an emoji picker                                                                                                                                                                                                                           |
| `noMobileDrawer`  | `false`        | `boolean` <br> Disables mobile drawer behavior and always uses floating dropdown                                                                                                                                                                                                                                                                     |
| `drawerTitle`     | `Menu`         | `string` <br> Accessible name of the mobile drawer                                                                                                                                                                                                                                                                                                   |
| `transition-name` | —              | `string` `none` <br> Allows you to change or disable the Vue transition for dropdown appear. By default, placement-based transition is used. Set to `none` when using the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) to prevent the default animation from conflicting with your view transition. |

Other attributes, such as `class`, are applied to the menu.

### Events

| Name    | Type | Description                         |
| ------- | ---- | ----------------------------------- |
| `close` | -    | Emitted when the dropdown is closed |

### Slots

| Name      | Accepts | Props                | Description                            |
| --------- | ------- | -------------------- | -------------------------------------- |
| `trigger` | `any`   | `DropdownSlotsProps` | The element that triggers the dropdown |
| `default` | `any`   | `DropdownSlotsProps` | The dropdown content                   |

Both slots share the same exposed properties

```ts
interface DropdownSlotsProps {
  isOpen: boolean
  open: () => void
  // In the default slot, close also returns focus to the trigger
  close: () => void
  toggle: () => void
}
```

### Exposes

When queried via `useTemplateRef`, this component exposes

| Name     | Type           | Description              |
| -------- | -------------- | ------------------------ |
| `open`   | `method`       | Opens the menu           |
| `close`  | `method`       | Closes the menu          |
| `toggle` | `method`       | Toggles the menu         |
| `isOpen` | `Ref<boolean>` | Whether the menu is open |

### Nested dropdowns

Use [PopoutHover](/docs/components/popout-hover) inside a dropdown to create multi-level menus. Nest it anywhere in the default slot and use `placement="right-start"` (or `left-start`) to open the submenu to the side. Give the submenu `role="menu"`. Items inside submenus close the whole menu when activated.

::dropdown-nested-example

```vue
<script setup lang="ts">
import { Button, Divider, Dropdown, DropdownItem, DropdownTitle, PopoutHover } from '@dolanske/vui'
</script>

<template>
  <Dropdown>
    <template #trigger="{ toggle }">
      <Button variant="fill" @click="toggle">
        File
      </Button>
    </template>

    <DropdownTitle>File</DropdownTitle>

    <DropdownItem>
      New file
      <template #hint>
        <Icon name="ph:command" />
        + N
      </template>
    </DropdownItem>

    <PopoutHover placement="right-start" role="menu">
      <template #trigger>
        <DropdownItem>
          <template #icon>
            <Icon name="ph:clock-counter-clockwise" />
          </template>
          Open recent
          <template #iconEnd>
            <Icon name="ph:caret-right" />
          </template>
        </DropdownItem>
      </template>
      <div class="vui-dropdown">
        <DropdownTitle>Recent</DropdownTitle>
        <DropdownItem>dashboard.vue</DropdownItem>
        <DropdownItem>settings.vue</DropdownItem>
        <DropdownItem>index.vue</DropdownItem>
      </div>
    </PopoutHover>

    <Divider />

    <DropdownItem>
      <template #icon>
        <Icon name="ph:trash" />
      </template>
      Move to trash
    </DropdownItem>
  </Dropdown>
</template>
```

::

### Components

The dropdown component is meant to be used with a few specific components. If you're looking for a generic floating component, check out the [Popout](/docs/components/popout).

#### DropdownItem

A clickable item in the dropdown menu. It is a `button` by default, a link when `href` is set, or any element or component passed to `as`.

::dropdown-item-example

```vue
<script setup lang="ts">
import { DropdownItem } from '@dolanske/vui'
import { IconCommand, IconPlus, IconTrash, IconUser } from '@iconify-prerendered/vue-ph'
</script>

<template>
  <DropdownItem>
    Create
    <template #iconEnd>
      <IconPlus />
    </template>
  </DropdownItem>
  <DropdownItem>
    <template #icon>
      <IconUser />
    </template>
    Update
    <template #hint>
      <IconCommand />
      + U
    </template>
  </DropdownItem>
  <DropdownItem disabled>
    Delete
    <template #iconEnd>
      <IconTrash />
    </template>
  </DropdownItem>
</template>
```

::

##### Props

| Name       | Default    | Type                                                                                                                       |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | `false`    | `boolean` <br> Whether the item is disabled                                                                                |
| `size`     | —          | `'s'` `'m'` <br> Size of the dropdown item                                                                                 |
| `keepOpen` | `false`    | `boolean` <br> Keeps the menu open after the item is activated, e.g. for toggles                                           |
| `href`     | —          | `string` <br> Renders the item as a link                                                                                   |
| `as`       | —          | `string` `Component` <br> Element or component to render, e.g. `RouterLink` with a `to` attribute                          |
| `role`     | `menuitem` | `menuitem` `menuitemcheckbox` `menuitemradio` `option` <br> ARIA role. Outside of menus (e.g. in a Sidebar) no role is set |

##### Events

| Name    | Payload      | Description                                                                 |
| ------- | ------------ | --------------------------------------------------------------------------- |
| `click` | `MouseEvent` | Emitted on activation. Calling `event.preventDefault()` keeps the menu open |

##### Slots

| Name      | Accepts | Props | Description                           |
| --------- | ------- | ----- | ------------------------------------- |
| `default` | `any`   | -     | The main content of the item          |
| `icon`    | `any`   | -     | Icon shown before the content         |
| `iconEnd` | `any`   | -     | Icon shown at the end of the item     |
| `hint`    | `any`   | -     | Additional hint text, e.g. a shortcut |

#### DropdownTitle

A title or header section in the dropdown menu which also divides the dropdown into sections.

::dropdown-title-example

```vue
<template>
  <DropdownTitle>
    Points
    <template #end>
      10
    </template>
  </DropdownTitle>
  <DropdownTitle class="w-100">
    Manage
    <template #end>
      <IconPlus />
    </template>
  </DropdownTitle>
</template>
```

::

##### Props

| Name     | Default | Type                                                     |
| -------- | ------- | -------------------------------------------------------- |
| `sticky` | `false` | `boolean` <br> Whether the title should stick to the top |

##### Slots

| Name      | Accepts | Props | Description                                |
| --------- | ------- | ----- | ------------------------------------------ |
| `default` | `any`   | -     | The title text                             |
| `end`     | `any`   | -     | Content to display at the end of the title |

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                       | Default | Description                                            |
| --------------------------- | ------- | ------------------------------------------------------ |
| `--vui-dropdown-min-width`  | `156px` | Minimum dropdown width, set from the `minWidth` prop   |
| `--vui-dropdown-max-height` | `356px` | Maximum dropdown height, set from the `maxHeight` prop |
