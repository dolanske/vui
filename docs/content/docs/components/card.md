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
      <Button plain size="s" square>
        <IconX />
      </Button>
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

  <Card header-align="center" class="w-100" separators>
    <template #header>
      <strong class="text-bold text-xl mb-s block">Centered Header</strong>
      <p>Use <code>header-align</code> to vertically align header content. This is useful when you the header contains more than just the card title.</p>
    </template>
    <template #header-end>
      <Button plain size="s" square>
        <Icon name="ph:x" />
      </Button>
    </template>
    <p class="m-0">
      Hello I'm a description and completely unrelated to this example.
    </p>
  </Card>
</template>
```

::

### Props

| Name              | Default    | Type                                                                                                      |
| ----------------- | ---------- | --------------------------------------------------------------------------------------------------------- |
| `separators`      | `false`    | `boolean` <br> Adds separators between all sections (header, content, footer)                             |
| `headerSeparator` | `false`    | `boolean` <br> Adds a separator only after the header section                                             |
| `footerSeparator` | `false`    | `boolean` <br> Adds a separator only before the footer section                                            |
| `padding`         | `true`     | `boolean` <br> Controls whether the card content has padding                                              |
| `headerAlign`     | `baseline` | `'start' \| 'center' \| 'end' \| 'baseline'` <br> Controls vertical alignment of items in the card header |

### Slots

| Name         | Accepts | Description                                                              |
| ------------ | ------- | ------------------------------------------------------------------------ |
| `default`    | `any`   | The main content of the card                                             |
| `header`     | `any`   | Content to be displayed in the header section                            |
| `header-end` | `any`   | Content to be displayed at the end of the header section (right-aligned) |
| `footer`     | `any`   | Content to be displayed in the footer section                            |
