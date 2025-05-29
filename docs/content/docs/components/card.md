# Card

A card component that provides a container for content with optional header and footer sections. It supports separators between sections and customizable padding.

::card-example

```vue
<script setup>
import { Button, Card } from '@dolanske/vui'
</script>

<template>
  <Card>
    <template #header>
      Card Title
    </template>
    <p>This is the main content of the card.</p>
    <template #footer>
      <Button variant="fill">
        Action
      </Button>
    </template>
  </Card>
</template>
```

::

### Props

| Name              | Default | Type      | Description                                                    |
| ----------------- | ------- | --------- | -------------------------------------------------------------- |
| `separators`      | `false` | `boolean` | Adds separators between all sections (header, content, footer) |
| `headerSeparator` | `false` | `boolean` | Adds a separator only after the header section                 |
| `footerSeparator` | `false` | `boolean` | Adds a separator only before the footer section                |
| `padding`         | `true`  | `boolean` | Controls whether the card content has padding                  |

### Slots

| Name         | Description                                                              |
| ------------ | ------------------------------------------------------------------------ |
| `default`    | The main content of the card                                             |
| `header`     | Content to be displayed in the header section                            |
| `header-end` | Content to be displayed at the end of the header section (right-aligned) |
| `footer`     | Content to be displayed in the footer section                            |

Here's an example of a card with all features:

```vue
<script setup>
import { Button, Card } from '@dolanske/vui'
</script>

<template>
  <Card separators>
    <template #header>
      Card Title
    </template>
    <template #header-end>
      <Button variant="link">
        Settings
      </Button>
    </template>
    <p>This is the main content of the card.</p>
    <template #footer>
      <div class="flex justify-end gap-xs">
        <Button variant="gray">
          Cancel
        </Button>
        <Button variant="fill">
          Save
        </Button>
      </div>
    </template>
  </Card>
</template>
```
