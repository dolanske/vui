# Dropdown

A dropdown menu component that provides a flexible way to display a list of options or actions. It supports various features like positions, hints, titles and custom content.

> Plese note: components using popout ([Tooltip](/docs/components/tooltip), [Dropdown](/docs/components/dropdown) & [Popout](/docs/components/popout)) cannot be styled using `scoped` CSS in Vue SFC. However, you can just define a new `<style>` tag, style the popout inside and keep rest of your CSS scoped in a separate `<style scoped>`.

::dropdown-example{sourcePath="Dropdown/Dropdown.vue"}

```vue
<script setup lang="ts">
import { Button, Dropdown, DropdownItem, DropdownTitle } from '@dolanske/vui'
</script>

<template>
  <Dropdown>
    <template #trigger="{ open }">
      <Button variant="fill" @click="open">
        Menu
      </Button>
    </template>
    <DropdownTitle>
      Actions
      <div class="counter">
        3
      </div>
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
      <template #icon-end>
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

### Props

| Name              | Default        | Type                                                                                                                                                                                                                                                                                                                                                 |
| ----------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placement`       | `bottom-start` | `top` `right` `bottom` `left` `top-start` `top-end` `right-start` `right-end` `bottom-start` `bottom-end` `left-start` `left-end` <br> Position of the dropdown relative to the trigger                                                                                                                                                              |
| `minWidth`        | `156`          | `number` `string` <br> Minimum width of the dropdown in pixels or CSS units                                                                                                                                                                                                                                                                          |
| `maxHeight`       | `356`          | `number` `string` <br> Maximum height of the dropdown before scrolling in pixels or CSS units                                                                                                                                                                                                                                                        |
| `noMobileDrawer`  | `false`        | `boolean` <br> Disables mobile drawer behavior and always uses floating dropdown                                                                                                                                                                                                                                                                     |
| `transition-name` | —              | `string` `none` <br> Allows you to change or disable the Vue transition for dropdown appear. By default, placement-based transition is used. Set to `none` when using the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) to prevent the default animation from conflicting with your view transition. |

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
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}
```

### Nested dropdowns

Use [PopoutHover](/docs/components/popout-hover) inside a dropdown to create multi-level menus. Nest it anywhere in the default slot and use `placement="right-start"` (or `left-start`) to open the submenu to the side.
::dropdown-nested-example

```vue
<script setup lang="ts">
import { Button, Divider, Dropdown, DropdownItem, DropdownTitle, PopoutHover } from '@dolanske/vui'
</script>

<template>
  <Dropdown>
    <template #trigger="{ open }">
      <Button variant="fill" @click="open">
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

    <PopoutHover placement="right-start">
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
        <Divider />
        <PopoutHover placement="right-start">
          <template #trigger>
            <DropdownItem>
              More files
              <template #iconEnd>
                <Icon name="ph:caret-right" />
              </template>
            </DropdownItem>
          </template>
          <div class="vui-dropdown">
            <DropdownItem>profile.vue</DropdownItem>
            <DropdownItem>auth.vue</DropdownItem>
            <DropdownItem>404.vue</DropdownItem>
          </div>
        </PopoutHover>
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

The dropdopwn component is meant to be used with a few specific components. If you're looking for a generic floating component, check out the [Popout](/docs/components/popout).

#### DropdownItem

A clickable item in the dropdown menu.

::dropdown-item-example

```vue
<script setup lang="ts">
import { DropdownItem } from '@dolanske/vui'
</script>

<template>
  <DropdownItem>
    Create
    <template #icon-end>
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
    <template #icon-end>
      <IconTrash />
    </template>
  </DropdownItem>
</template>
```

::

##### Props

| Name       | Default | Type                                        |
| ---------- | ------- | ------------------------------------------- |
| `disabled` | `false` | `boolean` <br> Whether the item is disabled |
| `size`     | —       | `'s'` `'m'` <br> Size of the dropdown item  |

##### Slots

| Name      | Accepts | Props | Description                     |
| --------- | ------- | ----- | ------------------------------- |
| `default` | `any`   | -     | The main content of the item    |
| `hint`    | `any`   | -     | Additional hint text to display |

#### DropdownTitle

A title or header section in the dropdown menu which also divides the dropdown into sections.

::dropdown-title-example

```vue
<template>
  <DropdownTitle>
    Points
    <div class="counter">
      10
    </div>
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

| Token                       | Default | Description             |
| --------------------------- | ------- | ----------------------- |
| `--vui-dropdown-min-width`  | `128px` | Minimum dropdown width  |
| `--vui-dropdown-max-height` | `none`  | Maximum dropdown height |
