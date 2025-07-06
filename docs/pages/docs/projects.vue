<script setup lang="ts">
import { Button, Card, Flex } from '@dolanske/vui'

const projects = [
  {
    title: 'Hivecom',
    description: 'Community hub for my online friends built with nuxt, supabase and VUI. It features a fully fleshed out community management system with user management, roles, announcements, events, discord & steam integrations and so much more.',
    url: 'https://dev.hivecom.net/',
    tags: ['Marketing', 'Admin', 'CMS'],
  },
  {
    title: 'VUI docs',
    description: 'This documentation website was fully created using the library.',
    url: '/',
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
            <h3>
              {{ project.title }}
            </h3>
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

  h3 {
    margin-bottom: var(--space-xs);
  }

  p {
    margin: 0;
  }
}
</style>
