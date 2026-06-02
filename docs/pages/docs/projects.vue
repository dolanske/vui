<script setup lang="ts">
import { Alert, Card, Flex, viewport } from '@dolanske/vui'

const projects = [
  {
    title: 'Hivecom',
    description: 'Community hub for my online friends built with nuxt, supabase and VUI. It features a fully fleshed out community management system with user management, roles, announcements, events, discord & steam integrations and so much more.',
    url: 'https://hivecom.net/',
    logo: 'hivecom.svg',
    tags: ['Marketing', 'Management UI'],
  },
  {
    title: 'VUI docs',
    description: 'The website you\'re currently viewing has been created using the VUI component library.',
    url: 'https://dolanske.github.io/vui',
    logo: 'vui.svg',
    tags: ['Documentation'],
  },
  {
    title: 'Orbit',
    description: 'Orbit is a modern client layer built on IRC. Including voice calls, screen share, identity manager with cross-platform clients.',
    logo: 'orbit.svg',
    url: 'https://github.com/hivecom/orbit-spec',
    tags: ['IRC client', 'Voice Calls', 'Screen sharing'],
  },
] as const
</script>

<template>
  <div>
    <h1>Projects</h1>
    <p class="mb-xl">
      Projects built on top of, or partially utilising VUI for ther user interfaces.
    </p>
    <Alert variant="accent" class="mb-xl" filled>
      <Flex y-center x-between :column="viewport.s">
        <p class="m-0">
          Have you used <b>VUI</b> in your project? Add an issue and I'll list your project here!
        </p>
        <Button variant="accent" size="s" href="https://github.com/dolanske/vui/issues" target="_blank" rel="noopener noreferrer">
          Open Github
        </Button>
      </Flex>
    </Alert>
    <Grid :columns="viewport.s ? 1 : 2" :gap=" viewport.s ? 'm' : 'l'">
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
    }
  }

  img {
    margin: 0;
    border-radius: 0;
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
