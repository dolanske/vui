# Button

A button component that supports various styles, sizes, and states. It can be used as a standard button or as a link.

::button-example

```vue
<script setup>
import { Button } from '@dolanske/vui'
</script>

<template>
  <Button variant="fill" class="mb-xs">
    Primary Button
  </Button>
  <Button variant="gray" class="mb-xs">
    Secondary Button
  </Button>
  <Button variant="fill" icon="mdi:plus" class="mb-xs">
    With Icon
  </Button>
  <Button variant="fill" loading class="mb-xs">
    Loading
  </Button>
</template>
```

::

### Props

| Name       | Default  | Type                                                                                                    |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `loading`  | `false`  | `boolean` <br> Shows a loading spinner and disables the button                                          |
| `size`     | `'m'`    | `'s' \| 'm' \| 'l'` <br> Controls the size of the button                                                |
| `expand`   | `false`  | `boolean` <br> Makes the button expand to full width                                                    |
| `square`   | `false`  | `boolean` <br> Makes the button square instead of rectangular                                           |
| `icon`     | —        | `string` <br> Icon name from Iconify to display in the button                                           |
| `variant`  | `'gray'` | `'fill' \| 'danger' \| 'success' \| 'link' \| 'accent' \| 'gray'` <br> Controls the button's appearance |
| `outline`  | `false`  | `boolean` <br> Makes the button outlined instead of filled                                              |
| `disabled` | `false`  | `boolean` <br> Disables the button                                                                      |
| `plain`    | `false`  | `boolean` <br> Removes background and border, keeping only the text                                     |

### Slots

| Name      | Description                                     |
| --------- | ----------------------------------------------- |
| `default` | The main content of the button                  |
| `start`   | Content to be displayed before the main content |
| `end`     | Content to be displayed after the main content  |

Here's an example of using slots and icons:

::button-slot-example

```vue
<script setup>
import { Button } from '@dolanske/vui'
</script>

<template>
  <Button variant="fill">
    <template #start>
      <Icon name="ph:plus" />
    </template>
    Add Item
    <template #end>
      <Icon name="ph:caret-down" />
    </template>
  </Button>
</template>
```

::

### Events

The button component emits all standard button events like `click`, `focus`, `blur`, etc.
