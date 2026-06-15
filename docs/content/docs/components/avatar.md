# Avatar

The Avatar component displays a thumbnail image representing a user or entity. When no image source is provided, it shows a default avatar illustration.

::avatar-example{sourcePath="Avatar/Avatar.vue"}

```vue
<script setup>
import { Avatar } from '@dolanske/vui'
</script>

<template>
  <Avatar />
  <Avatar>JD</Avatar>
  <Avatar url="https://github.com/dolanske.png" size="l" />
  <Avatar :size="80">
    <Icon name="ph:person" />
  </Avatar>
</template>
```

::

### Props

| Name       | Default  | Type                                                                                        |
| ---------- | -------- | ------------------------------------------------------------------------------------------- |
| `size`     | `m`      | `s` `m` `l` `number` <br> The size of the avatar. Can be a predefined size or custom number |
| `radius`   | `pill`   | `xs` `s` `m` `l` `pill` `number` <br> The roundness of the avatar. The default is a circle  |
| `url`      | —        | `string` <br> URL of the avatar image to display                                            |
| `fallback` | —        | `string` <br> Text to show when the image fails to load                                     |
| `alt`      | `avatar` | `string` <br> Alt text for the avatar image                                                 |

### Slots

| Name      | Accepts | Description                                                                                         |
| --------- | ------- | --------------------------------------------------------------------------------------------------- |
| `default` | `any`   | Content to display inside the avatar (e.g. initials or text). Takes priority over `url` and `icon`  |
| `icon`    | `any`   | Custom icon to show as the fallback when no `url` or `default` slot content is provided             |
| `overlay` | `any`   | Content rendered as an absolute overlay on top of the avatar (e.g. an `Indicator` or action button) |

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                           | Default                                                                          | Description             |
| ------------------------------- | -------------------------------------------------------------------------------- | ----------------------- |
| `--vui-avatar-size`             | [`var(--interactive-el-height)`](/docs/tokens/layout#interactive-element-height) | Avatar width and height |
| `--vui-avatar-font-size`        | [`var(--font-size-s)`](/docs/tokens/text)                                        | Font size for initials  |
| `--vui-avatar-border-radius`    | `100%`                                                                           | Border radius           |
| `--vui-avatar-background-color` | [`var(--color-bg-raised)`](/docs/tokens/colors)                                  | Background color        |
| `--vui-avatar-color`            | [`var(--color-text-light)`](/docs/tokens/colors)                                 | Text color              |
