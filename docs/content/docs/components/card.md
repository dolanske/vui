# Card

A card component that provides a container for content with optional header and footer sections. It supports separators between sections and customizable padding.

::card-example

```vue
<script setup>
import { Button, Card } from '@dolanske/vui'
</script>

<template>
  <Card separators>
    <template #header>
      <strong class="text-bold text-xl">Separators</strong>
    </template>
    <template #header-end>
      <Button plain size="s" square icon="ph:x" />
    </template>
    <p class="m-0">
      This card has separators and a header-end slot. All the cool stuff.
    </p>
    <template #footer>
      <Flex x-end>
        <Button size="s" variant="gray" outline>
          Cancel
        </Button>
        <Button size="s" variant="fill">
          Save
        </Button>
      </Flex>
    </template>
  </Card>
</template>
```

::

### Props

| Name              | Default | Type                                                                          |
| ----------------- | ------- | ----------------------------------------------------------------------------- |
| `separators`      | `false` | `boolean` <br> Adds separators between all sections (header, content, footer) |
| `headerSeparator` | `false` | `boolean` <br> Adds a separator only after the header section                 |
| `footerSeparator` | `false` | `boolean` <br> Adds a separator only before the footer section                |
| `padding`         | `true`  | `boolean` <br> Controls whether the card content has padding                  |

### Slots

| Name         | Accepts | Description                                                              |
| ------------ | ------- | ------------------------------------------------------------------------ |
| `default`    | `any`   | The main content of the card                                             |
| `header`     | `any`   | Content to be displayed in the header section                            |
| `header-end` | `any`   | Content to be displayed at the end of the header section (right-aligned) |
| `footer`     | `any`   | Content to be displayed in the footer section                            |
