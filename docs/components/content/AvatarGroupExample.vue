<script setup lang="ts">
import { Avatar, AvatarGroup, Flex } from '@dolanske/vui'

const avatars = [
  { name: 'dolanske', url: 'https://github.com/dolanske.png' },
  { name: 'Jokler', url: 'https://github.com/Jokler.png' },
  { name: 'zealsprince', url: 'https://github.com/zealsprince.png' },
  { name: 'kilmanio', url: 'https://github.com/kilmanio.png' },
]
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex column gap="m" x-start class="groups">
        <AvatarGroup>
          <Avatar v-for="avatar in avatars" :key="avatar.name" :url="avatar.url" />
        </AvatarGroup>

        <AvatarGroup cluster>
          <Avatar v-for="avatar in avatars" :key="avatar.name" :url="avatar.url" />
        </AvatarGroup>

        <AvatarGroup :limit="2" limit-size="m" cluster>
          <Avatar v-for="avatar in avatars" :key="avatar.name" size="m" :url="avatar.url" />
        </AvatarGroup>

        <AvatarGroup :limit="2" limit-size="m" cluster column>
          <Avatar v-for="avatar in avatars" :key="avatar.name" size="m" :url="avatar.url" />
        </AvatarGroup>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style lang="scss" scoped>
:deep(img) {
  margin: 0 !important;
  border-radius: 0 !important;
}
</style>

<style>
.groups .vui-avatar {
  --vui-avatar-group-border: var(--color-bg-lowered) !important;
}
</style>
