# Commands

A command palette component that provides a searchable, keyboard-navigable interface for executing actions. It supports grouping, keyboard shortcuts, icons, and full customization via slots.

The search input is a combobox controlling a listbox of commands, so screen readers announce the highlighted command while the user moves through results.

::commands-example{sourcePath="Commands/Commands.vue"}

```vue
<script setup lang="ts">
import type { Command } from '@dolanske/vui'
import { Button, Commands, Switch } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(false)
const isCompact = ref(false)

const commands: Command[] = [
  {
    title: 'Create New Project',
    description: 'Start a new project from scratch',
    group: 'File',
    shortcut: 'Ctrl+N',
    handler: () => createProjectPage(),
  },
  // [...]
]
</script>

<template>
  <Button @click="isOpen = true">
    Open
  </Button>
  <Switch v-model="isCompact" label="Compact" />
  <Commands
    v-model:open="isOpen"
    :commands="commands"
    :compact="isCompact"
  />
</template>
```

::

## Props

| Name            | Default              | Type                                                                                   |
| --------------- | -------------------- | -------------------------------------------------------------------------------------- |
| `open`          | —                    | `boolean` <br> Controls the visibility of the command palette. Supports `v-model:open` |
| `commands`      | —                    | `Command[]` <br> Array of command objects to display and search                        |
| `compact`       | `false`              | `boolean` <br> Renders compact command palette                                         |
| `placeholder`   | `'Type a command..'` | `string` <br> Placeholder text for the search input                                    |
| `loading`       | `false`              | `boolean` <br> Replaces the clear button with a spinner                                |
| `closeOnSelect` | `true`               | `boolean` <br> Closes the palette after a command was selected                         |

## Models

| Name     | Default | Type             | Description                                                                                         |
| -------- | ------- | ---------------- | --------------------------------------------------------------------------------------------------- |
| `search` | `''`    | `string`         | Two-way binding for the current search input value. Reset whenever the palette opens                |
| `group`  | `null`  | `string \| null` | Active group filter, `null` shows every group. `'Other'` groups are matched by an ungrouped command |

## Events

| Name          | Payload   | Description                                                                               |
| ------------- | --------- | ----------------------------------------------------------------------------------------- |
| `close`       | —         | Emitted once when `Esc` is pressed, the backdrop is clicked or a command is selected      |
| `update:open` | `boolean` | Emitted together with `close`, used by `v-model:open`                                     |
| `select`      | `Command` | Emitted when a command is selected, before its handler runs. Useful for router navigation |

## Keyboard

Keys are only handled while the palette is open.

| Key       | Action                                                                                                                        |
| --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `↑` / `↓` | Move between results                                                                                                          |
| `Enter`   | Run the highlighted command. Ignored on group buttons and during IME composition                                              |
| `Esc`     | Close the palette                                                                                                             |
| Shortcuts | Commands with a `shortcut` run when it is pressed. Shortcuts without Ctrl, Meta or Alt are ignored while typing in the search |

## Slots

The component allows you to fully customize the icon, command item or even replacing the entire command list (note that you will have to implement all the listing functionality yourself in that case).

| Name      | Props                                     | Description                                                |
| --------- | ----------------------------------------- | ---------------------------------------------------------- |
| `default` | `{ commands: Record<string, Command[]> }` | Overrides the entire result list. Receives grouped results |
| `command` | `{ command: Command, group: string }`     | Overrides the rendering of an individual command item      |
| `icon`    | `{ command: Command }`                    | Overrides the icon inside the default command item layout  |

The `command` slot renders inside an option which already selects the command on click. Do not add click handlers or buttons to it, they would run the command twice.

::commands-custom-example

```vue
<template>
  <Commands v-model:open="isOpen" :commands="commands">
    <!-- Override just the icon based on the command's group -->
    <template #icon="{ command }">
      <span>
        {{ command.group === 'File' ? '📄' : command.group === 'Navigation' ? '🧭' : '🎨' }}
      </span>
    </template>

    <!-- Override the entire command row -->
    <template #command="{ command }">
      <div class="my-command-row">
        <strong>{{ command.title }}</strong>
        <p v-if="command.description">
          {{ command.description }}
        </p>
      </div>
    </template>
  </Commands>
</template>
```

::

## Command

Each entry in the `commands` array must conform to this interface:

| Property      | Type                  | Description                                                                                                                                                    |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | `string`              | The display name of the command                                                                                                                                |
| `description` | `string?`             | Optional secondary text shown below the title                                                                                                                  |
| `keywords`    | `string[]?`           | Optional list of additional keywords. Not shown in the UI, but matched against the search query to improve discoverability                                     |
| `group`       | `string?`             | Optional group label. Commands without a group are collected under "Other"                                                                                     |
| `icon`        | `VNode?`              | Optional icon component to show on the left side of the command. The component is rendered as-is without any props                                             |
| `shortcut`    | `string?`             | Optional keyboard shortcut (e.g. `'Ctrl+K'`, `'Shift+Enter'`, `'Cmd+P'`). Shown as [`Kbd`](/docs/components/kbd) elements and active while the palette is open |
| `href`        | `string?`             | Navigates to this URL when selected                                                                                                                            |
| `target`      | `'_self' \| '_blank'` | Where `href` opens. Defaults to `_self` for same-origin links and `_blank` (with `noopener`) for external ones                                                 |
| `handler`     | `(() => void)?`       | Function to call when the command is selected. Takes precedence over `href`                                                                                    |

For in-app navigation with a router, use a `handler` (`() => router.push('/settings')`) or listen to the `select` event.

## Features

- **Search** — Filters commands by title, description and keywords as you type.
- **Group filtering** — A scrollable row of group buttons narrows results to a single group. Groups are sorted alphabetically, with "Other" last.
- **Keyboard navigation** — Use `↑` / `↓` to move between results, `Enter` to select, and `Esc` to close.
- **Shortcut keys** — Shortcuts defined on commands work while the palette is open.
- **Auto-scroll** — The highlighted command is automatically scrolled into view. Moving the mouse over a command highlights it.
- **Mobile** — A dedicated close button is shown on small screens, and the search is not focused automatically so the on-screen keyboard does not cover the results.

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                       | Default | Description                    |
| --------------------------- | ------- | ------------------------------ |
| `--vui-commands-input-size` | `56px`  | Input bar height               |
| `--vui-commands-max-height` | `612px` | Max height of the results list |
