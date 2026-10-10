# Emoji Picker

A searchable emoji picker with category tabs and hover previews. If needed, it can be placed inside a [Dropdown](/docs/components/dropdown).

Emoji data is loaded from the [emojibase](https://emojibase.dev) CDN and cached in `localStorage`. A loading state is shown while it loads, and an error state with a retry button if it fails. Use `cdn-url` to load a self hosted copy, e.g. with a strict Content Security Policy.

The emoji grid uses a single Tab stop. Arrow keys, `Home` and `End` move between emojis, and every emoji has an accessible label. Off-screen categories are only rendered once scrolled near.

::emoji-picker-example{sourcePath="EmojiPicker/EmojiPicker.vue"}

```vue
<script setup lang="ts">
import { Card, EmojiPicker } from '@dolanske/vui'
</script>

<template>
  <Card :padding="false" inline>
    <EmojiPicker :recent="['😀', '🎉']" @select="(emoji) => console.log(emoji.emoji)" />
  </Card>
</template>
```

::

### Props

| Name          | Default           | Type                                                                                                            |
| ------------- | ----------------- | --------------------------------------------------------------------------------------------------------------- |
| `recent`      | `[]`              | `string[]` <br> Raw emoji strings shown in a section at the top. The section is hidden while empty or searching |
| `recentLabel` | `Frequently Used` | `string` <br> Title of the recently used section                                                                |
| `autofocus`   | `false`           | `boolean` <br> Focuses the search input when the picker mounts                                                  |
| `cdnUrl`      | —                 | `string` <br> Base URL the emoji data is loaded from                                                            |

### Events

| Name     | Payload                                                        | Description                               |
| -------- | -------------------------------------------------------------- | ----------------------------------------- |
| `select` | [`Emoji`](https://emojibase.dev/api/emojibase/interface/Emoji) | Emitted when an emoji is selected         |
| `error`  | `unknown`                                                      | Emitted when the emoji data fails to load |

Pressing `Esc` in the search first clears it. Only an empty search lets `Esc` through, so it does not close a surrounding dropdown on the first press.

### Usage

In most cases, you will want to put the `<EmojiPicker />` component inside a Dropdown, so that it can be opened in a popout. Use `role="dialog"` on the Dropdown, since the picker is not a menu.

::emoji-picker-dropdown-example

```vue
<script setup lang="ts">
import { Button, Dropdown, EmojiPicker } from '@dolanske/vui'
</script>

<template>
  <Dropdown role="dialog">
    <template #trigger="{ toggle }">
      <Button size="s" @click="toggle">
        Choose emoji
      </Button>
    </template>
    <EmojiPicker />
  </Dropdown>
</template>
```

::

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                       | Default | Description                               |
| --------------------------- | ------- | ----------------------------------------- |
| `--vui-emoji-picker-height` | `380px` | Sets the height of the visible emoji list |
