# Dropdown

A dropdown menu component that provides a flexible way to display a list of options or actions. It supports various features like icons, hints, titles and custom content.

::dropdown-example

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
        <Icon icon="ph:command" />
        + C
      </template>
    </DropdownItem>
    <DropdownItem icon-end="ph:caret-right">
      Update
    </DropdownItem>
    <DropdownItem disabled icon="ph:x">
      Delete
    </DropdownItem>
  </Dropdown>
</template>
```

::

### Props

| Name        | Default        | Type                                                                                                                                                                                    |
| ----------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placement` | `bottom-start` | `top` `right` `bottom` `left` `top-start` `top-end` `right-start` `right-end` `bottom-start` `bottom-end` `left-start` `left-end` <br> Position of the dropdown relative to the trigger |
| `minWidth`  | `156`          | `number` `string` <br> Minimum width of the dropdown in pixels or CSS units                                                                                                             |
| `expand`    | `false`        | `boolean` <br> Whether to expand the dropdown to match the trigger's width                                                                                                              |
| `maxHeight` | `356`          | `number` `string` <br> Maximum height of the dropdown before scrolling in pixels or CSS units                                                                                           |

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
  <DropdownItem icon-end="ph:plus">
    Create
  </DropdownItem>
  <DropdownItem icon="ph:user">
    Update
    <template #hint>
      <Icon name="ph:command" />
      + U
    </template>
  </DropdownItem>
  <DropdownItem disabled icon-end="ph:trash">
    Delete
  </DropdownItem>
</template>
```

::

##### Props

| Name       | Default | Type                                                   |
| ---------- | ------- | ------------------------------------------------------ |
| `disabled` | `false` | `boolean` <br> Whether the item is disabled            |
| `icon`     | -       | `string` <br> Icon to display at the start of the item |
| `iconEnd`  | -       | `string` <br> Icon to display at the end of the item   |

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
      <Icon name="ph:plus" />
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
