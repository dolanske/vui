# Emoji Picker

A searchable emoji picker with category tabs and hover previews. It uses emojibase data and emits the selected emoji object.

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

| Name     | Payload | Description                            |
| -------- | ------- | -------------------------------------- |
| `select` | `Emoji` | Emitted when an emoji is selected      |

### Features

- **Category tabs** - Browse emojis by group.
- **Search** - Find emojis by label and tags.
- **Preview footer** - Shows the currently hovered emoji and its label.
