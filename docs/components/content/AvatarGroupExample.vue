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
      <Flex gap="m" x-center y-center class="groups">
        <AvatarGroup :limit="3" limit-size="l" cluster>
          <Avatar v-for="avatar in avatars" :key="avatar.name" size="l" :url="avatar.url" />
        </AvatarGroup>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style lang="scss">
.groups {
  .vui-avatar-group {
    --vui-avatar-group-border: var(--color-bg-lowered);
  }

  img {
    border-radius: var(--border-radius-pill);
  }
}
</style>
