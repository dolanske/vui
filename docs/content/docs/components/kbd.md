# Keyboard Shortcut

A component that displays keyboard shortcuts and can optionally highlight when the keys are pressed or react to them. It's useful for showing keyboard shortcuts in your application.

Keys are formatted for the platform: on macOS modifiers use their symbols without separators (`⌘K`), elsewhere they are joined with `+` (`Ctrl + K`).

::kbd-example{sourcePath="Kbd/Kbd.vue"}

```vue
<script setup>
import { Flex, Kbd, KbdGroup } from '@dolanske/vui'
import { useEventListener } from '@vueuse/core'
import { ref } from 'vue'

const isActive = ref(false)

useEventListener(document, 'keyup', () => {
  isActive.value = false
})
</script>

<template>
  <Flex column y-center>
    <Flex x-center gap="xs">
      <KbdGroup @trigger="isActive = true">
        <Kbd keys="Shift" highlight />
        <Kbd keys="S" highlight />
      </KbdGroup>
    </Flex>
    <p
      :style="{ color: isActive
        ? 'var(--color-text-green)'
        : 'var(--color-text)',
      }"
    >
      {{ isActive ? 'Yay!!!!' : 'Press both keys.' }}
    </p>
  </Flex>
</template>
```

::

### Props

| Name            | Default | Type                                                                                                          |
| --------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `keys`          | —       | `string`<br>The key or combination of keys to display (e.g., `Escape`, `Ctrl+A` or `Cmd+Shift+P`)             |
| `label`         | —       | `string`<br>Custom label to display instead of the automatically formatted keys                               |
| `highlight`     | `false` | `boolean`<br>Whether to highlight the shortcut while the keys are held down                                   |
| `allowInInputs` | `false` | `boolean`<br>Fire `trigger` while typing in a text field. By default only shortcuts with Ctrl, Meta or Alt do |

### Slots

| Name      | Accepts | Description                                                                                                                          |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `default` | `any`   | Content to be displayed instead of the label or selected keys. This is useful when you want to display an icon instead of just text. |

### Events

| Name      | Payload | Description                                                                                                  |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `trigger` | -       | Emitted when the key or combination is pressed. A keyboard listener is only attached when this event is used |

## KbdGroup

Wrap individual `<Kbd />` components in a `<KbdGroup />` to show the keys of one shortcut together and react to the whole combination. The group reacts to children being added, removed or changing their keys.

### Props

| Name            | Default | Type                                                     |
| --------------- | ------- | -------------------------------------------------------- |
| `allowInInputs` | `false` | `boolean`<br>Fire `trigger` while typing in a text field |

### Slots

| Name      | Accepts | Description                       |
| --------- | ------- | --------------------------------- |
| `default` | `<Kbd>` | Individual keys inside a shortcut |

### Events

| Name      | Payload | Description                                                   |
| --------- | ------- | ------------------------------------------------------------- |
| `trigger` | -       | Emitted once the combination of all `<Kbd />` keys is pressed |
