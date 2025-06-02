# Dropdown

A dropdown menu component that provides a flexible way to display a list of options or actions. It supports various features like icons, hints, titles and custom content.

::dropdown-example

```vue
<script setup lang="ts">
import { Button, Dropdown, DropdownItem, DropdownTitle } from '@dolanske/vui'
</script>

<template>
  <Dropdown>
    <template #trigger="{ toggle }">
      <Button class="btn btn-primary" @click="toggle">
        Menu
      </Button>
    </template>

    <DropdownTitle>
      Actions
      <template #end>
        3
      </template>
    </DropdownTitle>

    <DropdownItem icon="ph:user">
      New user
      <template #hint>
        <Icon icon="ic:round-keyboard-command-key" />
        + C
      </template>
    </DropdownItem>
    <DropdownItem icon-end="ph:arrow-right">
      Update
    </DropdownItem>
    <DropdownItem>Cancel</DropdownItem>

    <DropdownTitle>Yourself</DropdownTitle>
    <DropdownItem icon="ph:x" disabled>
      Disabled option
    </DropdownItem>
    <DropdownItem icon="ph:x">
      Delete
    </DropdownItem>
  </Dropdown>
</template>
```

::

### Props

| Name        | Type               | Default          | Description                                                            |
| ----------- | ------------------ | ---------------- | ---------------------------------------------------------------------- |
| `placement` | `Placement`        | `'bottom-start'` | Position of the dropdown relative to the trigger                       |
| `minWidth`  | `number \| string` | `156`            | Minimum width of the dropdown in pixels or CSS units                   |
| `expand`    | `boolean`          | `false`          | Whether to expand the dropdown to match the trigger's width            |
| `maxHeight` | `number \| string` | `356`            | Maximum height of the dropdown before scrolling in pixels or CSS units |

### Events

| Name    | Type | Description                         |
| ------- | ---- | ----------------------------------- |
| `close` | -    | Emitted when the dropdown is closed |

### Slots

| Name      | Props                                                                          | Description                            |
| --------- | ------------------------------------------------------------------------------ | -------------------------------------- |
| `trigger` | `{ open: () => void, isOpen: boolean, close: () => void, toggle: () => void }` | The element that triggers the dropdown |
| `default` | `{ open: () => void, close: () => void, toggle: () => void, isOpen: boolean }` | The dropdown content                   |

### Components

#### DropdownItem

A clickable item in the dropdown menu.

##### Props

| Name       | Type      | Default | Description                              |
| ---------- | --------- | ------- | ---------------------------------------- |
| `disabled` | `boolean` | `false` | Whether the item is disabled             |
| `icon`     | `string`  | -       | Icon to display at the start of the item |
| `iconEnd`  | `string`  | -       | Icon to display at the end of the item   |

##### Slots

| Name      | Props | Description                     |
| --------- | ----- | ------------------------------- |
| `default` | -     | The main content of the item    |
| `hint`    | -     | Additional hint text to display |

#### DropdownTitle

A title or header section in the dropdown menu.

##### Props

| Name     | Type      | Default | Description                               |
| -------- | --------- | ------- | ----------------------------------------- |
| `sticky` | `boolean` | `false` | Whether the title should stick to the top |

##### Slots

| Name      | Props | Description                                |
| --------- | ----- | ------------------------------------------ |
| `default` | -     | The title text                             |
| `end`     | -     | Content to display at the end of the title |

### Examples

::dropdown-basic-example

```vue
<script setup>
import { Button, Dropdown, DropdownItem } from '@dolanske/vui'
</script>

<template>
  <Dropdown>
    <template #trigger>
      <Button>
        Open Menu
      </Button>
    </template>

    <DropdownItem>Option 1</DropdownItem>
    <DropdownItem>Option 2</DropdownItem>
    <DropdownItem>Option 3</DropdownItem>
  </Dropdown>
</template>
```

::

::dropdown-icons-example

```vue
<script setup>
import { Button, Dropdown, DropdownItem } from '@dolanske/vui'
</script>

<template>
  <Dropdown>
    <template #trigger>
      <Button>
        Actions
      </Button>
    </template>

    <DropdownItem icon="ph:edit">
      Edit
      <template #hint>
        Ctrl + E
      </template>
    </DropdownItem>
    <DropdownItem icon="ph:trash">
      Delete
      <template #hint>
        Del
      </template>
    </DropdownItem>
  </Dropdown>
</template>
```

::

::dropdown-title-example

```vue
<script setup>
import { Button, Dropdown, DropdownItem, DropdownTitle } from '@dolanske/vui'
</script>

<template>
  <Dropdown>
    <template #trigger>
      <Button>
        Settings
      </Button>
    </template>

    <DropdownTitle>
      User Settings
      <template #end>
        <span class="text-sm text-gray-500">v1.0.0</span>
      </template>
    </DropdownTitle>

    <DropdownItem icon="ph:user">
      Profile
    </DropdownItem>
    <DropdownItem icon="ph:bell">
      Notifications
    </DropdownItem>
    <DropdownItem icon="ph:lock">
      Security
    </DropdownItem>
  </Dropdown>
</template>
```

::

::dropdown-expanded-example

```vue
<script setup>
import { Button, Dropdown, DropdownItem } from '@dolanske/vui'
</script>

<template>
  <Dropdown expand>
    <template #trigger>
      <Button class="w-[200px]">
        Select Option
      </Button>
    </template>

    <DropdownItem>Option 1</DropdownItem>
    <DropdownItem>Option 2</DropdownItem>
    <DropdownItem>Option 3</DropdownItem>
  </Dropdown>
</template>
```

::

::dropdown-placement-example

```vue
<script setup>
import { Button, Dropdown, DropdownItem } from '@dolanske/vui'
</script>

<template>
  <Dropdown placement="right-start">
    <template #trigger>
      <Button>
        Open Menu
      </Button>
    </template>

    <DropdownItem>Option 1</DropdownItem>
    <DropdownItem>Option 2</DropdownItem>
    <DropdownItem>Option 3</DropdownItem>
  </Dropdown>
</template>
```

::
