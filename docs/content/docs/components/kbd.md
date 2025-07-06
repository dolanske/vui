# Keyboard Shortcut

A component that displays keyboard shortcuts and can optionally highlight when the keys are pressed. It's useful for showing keyboard shortcuts in your application.

::kbd-example

```vue
<script setup>
import { Flex, Kbd, KbdGroup } from '@dolanske/vui'
import { useEventListener } from '@vueuse/core'

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

| Name        | Default | Type                                                                               |
| ----------- | ------- | ---------------------------------------------------------------------------------- |
| `keys`      | —       | `string`<br>The key or combination of keys to display (e.g., `Escape` or `Ctrl+A`) |
| `label`     | —       | `string`<br>Custom label to display instead of the automatically formatted keys    |
| `highlight` | `false` | `boolean`<br>Whether to highlight the shortcut when the keys are pressed           |

### Slots

| Name      | Accepts | Description                                                                                                                          |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `default` | `any`   | Content to be displayed instead of the label or selected keys. This is useful when you want to display an icon instead of just text. |

### Events

| Name      | Payload | Description                                            |
| --------- | ------- | ------------------------------------------------------ |
| `trigger` | -       | Emitted when the key or combination of keys is pressed |

## KbdGroup

You can wrap individual `<Kbd />` components in a `<KbdGroup />` in case you want to visually distinguish each key inside a keyboard shortcut.

### Slots

| Name      | Accepts | Description                                                        |
| --------- | ------- | ------------------------------------------------------------------ |
| `default` | `<Kbd>` | Individual keys inside a shortcut. Any other component will error. |

### Events

| Name      | Payload | Description                                             |
| --------- | ------- | ------------------------------------------------------- |
| `trigger` | -       | Emitted once all the `<Kbd />` components are triggered |
