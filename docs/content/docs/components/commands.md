# Commands

A command palette component that provides a searchable, keyboard-navigable interface for executing actions. It supports grouping, keyboard shortcuts, icons, and full customization via slots.

::commands-example

```vue
<script setup lang="ts">
import { Button, Commands } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(false)

const commands = [
  {
    title: 'Create New Project',
    description: 'Start a new project from scratch',
    group: 'File',
    handler: () => {},
  },
  {
    title: 'Open Settings',
    description: 'Access application settings and preferences',
    group: 'Navigation',
    handler: () => {},
  },
  {
    title: 'Toggle Dark Mode',
    description: 'Switch between light and dark themes',
    group: 'Appearance',
    handler: () => {},
  },
  {
    title: 'Show Shortcuts',
    description: 'Display all available keyboard shortcuts',
    group: 'Help',
    shortcut: 'Ctrl+/',
    handler: () => {},
  },
]
</script>

<template>
  <Button @click="isOpen = true">
    Open Commands
  </Button>
  <Commands
    :open="isOpen"
    :commands="commands"
    @close="isOpen = false"
  />
</template>
```

::

## Props

| Name          | Default               | Type                                                            |
| ------------- | --------------------- | --------------------------------------------------------------- |
| `open`        | —                     | `boolean` <br> Controls the visibility of the command palette   |
| `commands`    | —                     | `Command[]` <br> Array of command objects to display and search |
| `placeholder` | `'Write a command..'` | `string` <br> Placeholder text for the search input             |
| `loading`     | —                     | `boolean` <br> Replaces the search icon with a spinner          |

## Models

| Name     | Default | Type             | Description                                           |
| -------- | ------- | ---------------- | ----------------------------------------------------- |
| `search` | `''`    | `string`         | Two-way binding for the current search input value    |
| `group`  | `'All'` | `string \| null` | Two-way binding for the currently active group filter |

## Events

| Name    | Payload | Description                                                  |
| ------- | ------- | ------------------------------------------------------------ |
| `close` | —       | Emitted when `Esc` is pressed or the close button is clicked |

## Slots

The component allows you to fully customize the icon, command item or even replacing the entire command list (note that you will have to implement all the listing functionality yourself in that case).

| Name      | Props                                     | Description                                                |
| --------- | ----------------------------------------- | ---------------------------------------------------------- |
| `default` | `{ commands: Record<string, Command[]> }` | Overrides the entire result list. Receives grouped results |
| `command` | `{ command: Command, group: string }`     | Overrides the rendering of an individual command item      |
| `icon`    | `{ command: Command }`                    | Overrides the icon inside the default command item layout  |

::commands-custom-example

```vue
<template>
  <Commands :open="isOpen" :commands="commands" @close="isOpen = false">
    <!-- Override just the icon based on the command's group -->
    <template #icon="{ command }">
      <span>
        {{ command.group === 'File' ? '📄' : command.group === 'Navigation' ? '🧭' : '🎨' }}
      </span>
    </template>

    <!-- Override the entire command row -->
    <template #command="{ command }">
      <button @click="command.handler">
        <span>
          {{ command.group === 'File' ? '📄' : command.group === 'Navigation' ? '🧭' : '🎨' }}
        </span>
        <span>
          <strong>{{ command.title }}</strong>
          <p v-if="command.description">{{ command.description }}</p>
        </span>
        <span v-if="command.group">{{ command.group }}</span>
      </button>
    </template>
  </Commands>
</template>
```

::

## Command

Each entry in the `commands` array must conform to this interface:

| Property      | Type            | Description                                                                                                                                                                                                       |
| ------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | `string`        | The display name of the command                                                                                                                                                                                   |
| `description` | `string?`       | Optional secondary text shown below the title                                                                                                                                                                     |
| `group`       | `string?`       | Optional group label. Commands without a group are collected under "Other"                                                                                                                                        |
| `icon`        | `VNode?`        | Optional icon component to show on the left side of the command. Please note this field assumes the developer is providing a component as-is without any props.                                                   |
| `shortcut`    | `string?`       | Optional keyboard shortcut string (e.g. `'Ctrl+K'`). Keys are split by `+` and rendered as [`Kbd`](/docs/components/kbd) elements. The shortcut is also registered as a global listener while the palette is open |
| `href`        | `string?`       | If provided, selecting the command will open this URL in a new tab                                                                                                                                                |
| `handler`     | `(() => void)?` | Function to call when the command is selected. Takes precedence over `href`                                                                                                                                       |

## Features

- **Search** — Filters commands by title, description, group, or href as you type.
- **Group filtering** — A scrollable row of group badges lets users narrow results to a single group.
- **Keyboard navigation** — Use `↑` / `↓` to move between results, `Enter` to select, and `Esc` to close.
- **Shortcut keys** — Shortcuts defined on commands are registered as global key listeners while the component is mounted.
- **Auto-scroll** — The focused item is automatically scrolled into view.
- **Mobile** — A dedicated close button is shown on small screens instead of relying solely on `Esc`.
