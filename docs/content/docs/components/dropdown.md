# Dropdown

A dropdown menu component that provides a flexible way to display a list of options or actions. It supports various features like icons, hints, and custom content.

## Usage

```vue
<script setup>
import { Button, Dropdown, DropdownItem, DropdownTitle } from '@dolanske/vui'

const isOpen = ref(false)
</script>

<template>
  <Dropdown>
    <template #trigger>
      <Button>
        Open Menu
      </Button>
    </template>

    <DropdownTitle>Menu Title</DropdownTitle>
    <DropdownItem icon="ph:house">
      Home
    </DropdownItem>
    <DropdownItem icon="ph:gear">
      Settings
    </DropdownItem>
    <DropdownItem icon="ph:sign-out" disabled>
      Sign Out
    </DropdownItem>
  </Dropdown>
</template>
```

## Components

### Dropdown

The main dropdown container component.

#### Props

| Name        | Type               | Default          | Description                                                            |
| ----------- | ------------------ | ---------------- | ---------------------------------------------------------------------- |
| `placement` | `Placement`        | `'bottom-start'` | Position of the dropdown relative to the trigger                       |
| `minWidth`  | `number \| string` | `156`            | Minimum width of the dropdown in pixels or CSS units                   |
| `expand`    | `boolean`          | `false`          | Whether to expand the dropdown to match the trigger's width            |
| `maxHeight` | `number \| string` | `356`            | Maximum height of the dropdown before scrolling in pixels or CSS units |

#### Events

| Name    | Type | Description                         |
| ------- | ---- | ----------------------------------- |
| `close` | -    | Emitted when the dropdown is closed |

#### Slots

| Name      | Props                                                                          | Description                            |
| --------- | ------------------------------------------------------------------------------ | -------------------------------------- |
| `trigger` | `{ open: () => void, isOpen: boolean, close: () => void, toggle: () => void }` | The element that triggers the dropdown |
| `default` | `{ open: () => void, close: () => void, toggle: () => void, isOpen: boolean }` | The dropdown content                   |

### DropdownItem

A clickable item in the dropdown menu.

#### Props

| Name       | Type      | Default | Description                              |
| ---------- | --------- | ------- | ---------------------------------------- |
| `disabled` | `boolean` | `false` | Whether the item is disabled             |
| `icon`     | `string`  | -       | Icon to display at the start of the item |
| `iconEnd`  | `string`  | -       | Icon to display at the end of the item   |

#### Slots

| Name      | Props | Description                     |
| --------- | ----- | ------------------------------- |
| `default` | -     | The main content of the item    |
| `hint`    | -     | Additional hint text to display |

### DropdownTitle

A title or header section in the dropdown menu.

#### Props

| Name     | Type      | Default | Description                               |
| -------- | --------- | ------- | ----------------------------------------- |
| `sticky` | `boolean` | `false` | Whether the title should stick to the top |

#### Slots

| Name      | Props | Description                                |
| --------- | ----- | ------------------------------------------ |
| `default` | -     | The title text                             |
| `end`     | -     | Content to display at the end of the title |

## Examples

### Basic Dropdown

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

### Dropdown with Icons and Hints

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

### Dropdown with Title

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

### Expanded Dropdown

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

### Custom Placement

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
