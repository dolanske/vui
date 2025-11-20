# Avatar

The Avatar component displays a thumbnail image representing a user or entity. When no image source is provided, it shows a default avatar illustration.

::avatar-example

```vue
<script setup>
import { Avatar } from '@dolanske/vui'
</script>

<template>
  <Avatar />
  <Avatar>JD</Avatar>
  <Avatar>
    <IconPerson />
  </Avatar>
  <Avatar url="https://github.com/dolanske.png" />
  <Avatar size="s" />
  <Avatar size="m" />
  <Avatar size="l" />
  <Avatar :size="80" />
</template>
```

::

### Props

| Name       | Default  | Type                                                                                        |
| ---------- | -------- | ------------------------------------------------------------------------------------------- |
| `size`     | `m`      | `s` `m` `l` `number` <br> The size of the avatar. Can be a predefined size or custom number |
| `radius`   | `999`    | `xs` `s` `m` `l` `number` <br> The roundness of the avatar. The default is a circle         |
| `url`      | —        | `string` <br> URL of the avatar image to display                                            |
| `fallback` | —        | `string` <br> Text to show when the image fails to load                                     |
| `alt`      | `avatar` | `string` <br> Alt text for the avatar image                                                 |

### Slots

| Name      | Accepts | Description                             |
| --------- | ------- | --------------------------------------- |
| `default` | `any`   | Content to display instead of the image |
