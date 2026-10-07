# Avatar

The Avatar component displays a thumbnail image representing a user or entity. Without an image it shows the `fallback` text (usually initials), and without both a default user icon.

::avatar-example{sourcePath="Avatar/Avatar.vue"}

```vue
<script setup>
import { Avatar } from '@dolanske/vui'
</script>

<template>
  <Avatar />
  <Avatar fallback="JD" />
  <Avatar url="https://github.com/dolanske.png" alt="dolanske" size="l" />
  <Avatar :size="80">
    <Icon name="ph:person" />
  </Avatar>
</template>
```

::

> Examples on this site use `<Icon>` from Nuxt Icon. It is not part of VUI, use any icon component you like.

### Props

| Name       | Default | Type                                                                                                                                             |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `size`     | `m`     | `s` `m` `l` `number` <br> The size of the avatar. Can be a predefined size or custom number of pixels                                            |
| `radius`   | `pill`  | `xs` `s` `m` `l` `pill` `number` <br> The roundness of the avatar. Numbers are pixels. The default is a circle                                   |
| `url`      | —       | `string` <br> URL of the avatar image to display. Changing it retries loading even after a previous image failed                                 |
| `fallback` | —       | `string` <br> Text (usually initials) shown when there is no `url` or the image fails to load                                                    |
| `alt`      | `''`    | `string` <br> Alternative text of the image. Empty marks the avatar as decorative, set it when the avatar is the only representation of a person |

### Slots

| Name      | Accepts | Description                                                                                         |
| --------- | ------- | --------------------------------------------------------------------------------------------------- |
| `default` | `any`   | Content to display inside the avatar. Takes priority over `url` and `fallback`                      |
| `icon`    | `any`   | Custom icon shown when there is no `url`, `fallback` or default slot content                        |
| `overlay` | `any`   | Content rendered as an absolute overlay on top of the avatar (e.g. an `Indicator` or action button) |

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                           | Default                                                                          | Description             |
| ------------------------------- | -------------------------------------------------------------------------------- | ----------------------- |
| `--vui-avatar-size`             | [`var(--interactive-el-height)`](/docs/tokens/layout#interactive-element-height) | Avatar width and height |
| `--vui-avatar-font-size`        | [`var(--font-size-s)`](/docs/tokens/text)                                        | Font size for initials  |
| `--vui-avatar-border-radius`    | [`var(--border-radius-pill)`](/docs/tokens/border-radius)                        | Border radius           |
| `--vui-avatar-background-color` | [`var(--color-bg-raised)`](/docs/tokens/colors)                                  | Background color        |
| `--vui-avatar-color`            | [`var(--color-text-light)`](/docs/tokens/colors)                                 | Text color              |
