# Card

A card component that provides a container for content with optional header and footer sections. It supports separators between sections and customizable padding.

::card-example{sourcePath="Card/Card.vue"}
```vue
<script setup>
import { Button, Card, Flex } from '@dolanske/vui'
</script>

<template>
  <Card separators>
    <template #header>
      <strong class="text-bold text-xl">Separators</strong>
    </template>
    <template #header-end>
      <Button plain size="s" square>
        <Icon name="ph:x" />
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

### Centered Header

Use the `header-align` prop to vertically align header content. This is useful when the header contains more than just the card title.

::card-centered-header-example
```vue
<script setup>
import { Button, Card } from '@dolanske/vui'
</script>

<template>
  <Card header-align="center" separators>
    <template #header>
      <strong class="text-bold text-xl mb-s block">Centered Header</strong>
      <p>Use <code>header-align</code> to vertically align header content. This is useful when the header contains more than just the card title.</p>
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

### Error State

Use `centered` and `border-style="dashed"` to create a styled error state card.

::card-error-example
```vue
<script setup>
import { Card } from '@dolanske/vui'
</script>

<template>
  <Card
    centered
    border-style="dashed"
    style="
      --vui-card-border-color: var(--color-text-red);
      --vui-card-background-color: transparent;"
  >
    <Icon name="ph:warning-circle" :size="40" class="mb-m text-color-red" />
    <strong class="text-bold text-l mb-s">Something went wrong</strong>
    <p class="text-color-lighter">
      We couldn't process your request. Please try again later.
    </p>
  </Card>
</template>
```

::

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                         | Default                                      | Description                |
| ----------------------------- | -------------------------------------------- | -------------------------- |
| `--vui-card-header-align`     | `center`                                     | Header content alignment   |
| `--vui-card-border-style`     | `solid`                                      | Border style               |
| `--vui-card-border-color`     | [`var(--color-border)`](/docs/tokens/colors) | Border color               |
| `--vui-card-background-color` | [`var(--color-bg)`](/docs/tokens/colors)     | Background color           |
| `--vui-card-padding-block`    | [`var(--space-m)`](/docs/tokens/spacing)     | Vertical content padding   |
| `--vui-card-padding-inline`   | [`var(--space-m)`](/docs/tokens/spacing)     | Horizontal content padding |
