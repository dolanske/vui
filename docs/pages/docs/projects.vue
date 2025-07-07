<script setup lang="ts">
import { Button, Card, Flex } from '@dolanske/vui'

const projects = [
  {
    title: 'Hivecom',
    description: 'Community hub for my online friends built with nuxt, supabase and VUI. It features a fully fleshed out community management system with user management, roles, announcements, events, discord & steam integrations and so much more.',
    url: 'https://dev.hivecom.net/',
    logo: 'hivecom.svg',
    tags: ['Marketing', 'Admin', 'CMS'],
  },
  {
    title: 'VUI docs',
    description: 'The website you\'re currently viewing has been created using the VUI component library.',
    url: '/',
    logo: 'vui.svg',
    tags: ['Documentation', 'CMS'],
  },
] as const
</script>

<template>
  <div>
    <h1>Projects using VUI</h1>

    <p class="mb-xl">
      Here's a list of projects which are built using VUI.
    </p>

    <Grid :columns="2" gap="l">
      <a v-for="project in projects" :key="project.url" :href="project.url" target="_blank" class="project-card">
        <Card>
          <Flex column gap="xs" style="height: 100%;">
            <Flex gap="s" y-center class="mb-m" expand>
              <NuxtImg
                :src="`/logos/${project.logo}`"
                :alt="project.title"
                width="32"
                height="32"
              />
              <h3 class="flex-1">
                {{ project.title }}
              </h3>
              <Icon name="ph:link" />
            </Flex>
            <p class="text-color-light flex-1">{{ project.description }}</p>

            <Flex v-if="project.tags.length" gap="xs" class="mt-xl">
              <Badge v-for="tag in project.tags" :key="tag">
                {{ tag }}
              </Badge>
            </Flex>
          </Flex>

        </Card>
      </a>
    </Grid>
  </div>
</template>

<style scoped lang="scss">
:deep(.vui-card) {
  height: 100%;

  .vui-card-content {
    height: 100%;
    padding: var(--space-xl);
  }
}

.project-card {
  display: block;
  height: 100%;
  border-radius: var(--border-radius-m);

  &:hover,
  &:focus-visible {
    .vui-card {
      border-color: var(--color-border-strong);
      background-color: var(--color-bg-lowered);
      cursor: default;
    }
  }

  img {
    margin: 0;
    border-radius: 0;
    // Font line-height offset
    transform: translateY(-2px);
  }

  h3 {
    display: block;
    margin: 0;
  }

  p {
    margin: 0;
  }
}
</style>
