# Emoji Picker

A searchable emoji picker with category tabs and hover previews. If needed, it can be placed inside a [Dropdown](/docs/components/dropdown)

::emoji-picker-example{sourcePath="EmojiPicker/EmojiPicker.vue"}

```vue
<script setup lang="ts">
import { Card, EmojiPicker } from '@dolanske/vui'
</script>

<template>
  <Card :padding="false" inline>
    <EmojiPicker />
  </Card>
</template>
```

::

### Events

| Name     | Payload                                                        | Description                       |
| -------- | -------------------------------------------------------------- | --------------------------------- |
| `select` | [`Emoji`](https://emojibase.dev/api/emojibase/interface/Emoji) | Emitted when an emoji is selected |

### Usage

In most cases, you will want to put the `<EmojiPicker />` component inside a Dropdown, so that it can be opened in a popout.

::emoji-picker-dropdown-example{sourcePath="EmojiPicker/EmojiPickerDropdown.vue"}

```vue
<script setup lang="ts">
import { Button, Card, Dropdown, EmojiPicker } from '@dolanske/vui'
</script>

<template>
  <Dropdown>
    <Button>Pick emoji</Button>

    <template #content>
      <Card :padding="false" inline>
        <EmojiPicker />
      </Card>
    </template>
  </Dropdown>
</template>
```

::

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                       | Default | Description                               |
| --------------------------- | ------- | ----------------------------------------- |
| `--vui-emoji-picker-height` | `380px` | Sets the height of the visible emoji list |
