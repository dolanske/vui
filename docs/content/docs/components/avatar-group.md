# Avatar Group

A wrapper component that groups multiple `Avatar` components together. Supports clustering avatars with overlapping borders, limiting the number of visible avatars with a remaining count, and both horizontal and vertical layouts.

::avatar-group-example

```vue
<script setup>
import { Avatar, AvatarGroup } from '@dolanske/vui'

const avatars = [
  { name: 'dolanske', url: 'https://github.com/dolanske.png' },
  { name: 'Jokler', url: 'https://github.com/Jokler.png' },
  { name: 'zealsprince', url: 'https://github.com/zealsprince.png' },
  { name: 'kilmanio', url: 'https://github.com/kilmanio.png' },
]
</script>

<template>
  <!-- Default -->
  <AvatarGroup>
    <Avatar v-for="avatar in avatars" :key="avatar.name" :url="avatar.url" />
  </AvatarGroup>

  <!-- Cluster mode -->
  <AvatarGroup cluster>
    <Avatar v-for="avatar in avatars" :key="avatar.name" :url="avatar.url" />
  </AvatarGroup>

  <!-- Cluster with limit -->
  <AvatarGroup :limit="2" limit-size="m" cluster>
    <Avatar v-for="avatar in avatars" :key="avatar.name" size="m" :url="avatar.url" />
  </AvatarGroup>

  <!-- Cluster with limit, vertical -->
  <AvatarGroup :limit="2" limit-size="m" cluster column>
    <Avatar v-for="avatar in avatars" :key="avatar.name" size="m" :url="avatar.url" />
  </AvatarGroup>
</template>
```

::

### Props

| Name         | Default | Type                                                                                                                  |
| ------------ | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `cluster`    | `false` | `boolean` <br> Groups avatars closer together with overlapping borders for a stacked appearance                       |
| `gap`        | —       | `xxs` `xs` `s` `m` `l` `xl` `xxl` `xxxl` `number` <br> Gap between avatars. Not available when `cluster` is enabled  |
| `limit`      | —       | `number` <br> Maximum number of avatars to show. A `+N` counter is rendered for the rest                              |
| `limitSize`  | —       | `s` `m` `l` `number` <br> Size of the overflow counter avatar. Should match the size of the `Avatar` components       |
| `randomized` | `false` | `boolean` <br> When `limit` is set, picks avatars randomly instead of the first ones                                  |
| `column`     | `false` | `boolean` <br> Stacks avatars vertically instead of horizontally                                                      |

### Slots

| Name        | Accepts             | Description                                                                                     |
| ----------- | ------------------- | ----------------------------------------------------------------------------------------------- |
| `default`   | `Avatar`            | One or more `Avatar` components (or elements wrapping them) to display in the group             |
| `remaining` | `{ remaining: number }` | Scoped slot to customize the overflow counter. Receives the number of hidden avatars as `remaining` |
