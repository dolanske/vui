<script setup lang="ts">
import { Button, Card, Grid, Input, searchString } from '@dolanske/vui'
import NoResults from '~/components/list/NoResults.vue'

const search = ref('')

const filteredComponents = computed(() => {
  if (!search.value)
    return componentList

  return componentList.filter((component) => {
    return searchString([component.name, ...(component.tags ?? [])], search.value)
  })
})
</script>

<template>
  <div>
    <h1>Components</h1>
    <p class="mb-l">
      The library consists of {{ componentList.length }} main components and some sub-components which are documented in the same section.
    </p>

    <Grid gap="l" :columns="2" class="mb-m">
      <Input v-model="search" placeholder="Search components..." class="w-100">
        <template #start>
          <Icon name="ph:magnifying-glass" />
        </template>
        <template #end>
          <Button v-if="search" plain square @click="search = ''">
            <Icon name="ph:x" />
          </Button>
        </template>
      </Input>
    </Grid>

    <Grid v-if="filteredComponents.length > 0" gap="l" :columns="2" style="align-items: stretch;">
      <NuxtLink v-for="component in filteredComponents" :key="component.name" :href="component.path">
        <Card style="height: 100%;" class="component-card">
          <Icon name="ph:shapes" size="24" />
          <h5 class="text-xxl">
            {{ component.name }}
          </h5>
          <p>{{ component.description }}</p>
        </Card>
      </NuxtLink>
    </Grid>

    <NoResults v-else :search="search" @clear="search = ''" />
  </div>
</template>

<style scoped>
.component-card {
  padding: var(--space-m);

  &:hover {
    border-color: var(--color-border-strong);
    background-color: var(--color-bg-lowered);
    cursor: default;
  }
}
</style>
