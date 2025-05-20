<script setup lang="ts">
import type { LinkItem } from '~/types/shared'
import { BreadcrumbItem, Breadcrumbs, Button, DropdownItem, Flex, Sidebar, Tab, Tabs } from '@dolanske/vui'

const route = useRoute()
const router = useRouter()

const availableTabs = ['Style tokens', 'CSS framework', 'Components'] as const
const currentTab = ref<typeof availableTabs[number]>('Style tokens')

const subPages: Record<typeof availableTabs[number], LinkItem[]> = {
  'Style tokens': [
    { label: 'Tokens', path: '/docs/tokens' },
    { label: 'Variables', path: '/docs/tokens/variables' },
    { label: 'Theme', path: '/docs/tokens/theme' },
  ],
  'CSS framework': [
    { label: 'Framework', path: '/docs/framework' },
    { label: 'Colors', path: '/docs/framework/colors' },
    { label: 'Text & font', path: '/docs/framework/text-font' },
    { label: 'Typography', path: '/docs/framework/typography' },
    { label: 'Spacing', path: '/docs/framework/spacing' },
    { label: 'Layout', path: '/docs/framework/layout' },
    // NOTE: utils, tooltip
    { label: 'Utilities', path: '/docs/framework/utilities' },
    { label: 'Defaults', path: '/docs/framework/defaults' },
  ],
  // TODO: list every component
  // NOTE: Make sure that components which are logically grouped, are within 1 sub-page
  'Components': [
    { label: 'Components', path: '/docs/components' },
  ],
}

const subPagesToRender = computed(() => subPages[currentTab.value])

const prevAndNext = computed(() => {
  const indexOfActive = subPagesToRender.value.findIndex(item => route.path === item.path)

  if (indexOfActive === -1)
    return null

  return {
    prev: subPagesToRender.value.at(indexOfActive - 1),
    next: subPagesToRender.value.at(indexOfActive + 1),
  }
})

// Reset to default route when main context changes
watch(subPagesToRender, (pages) => {
  router.push(pages[0].path)
})

// Bredcrumbs

// Combine current route path into clickable links
const breadcrumbItems = computed(() => {
  const reducedPathItems = route.path
    .substring(1, route.path.length)
    .split('/')
    .reduce((group, item) => {
      const prev = group.at(-1)

      group.push({
        label: item,
        path: `${prev ? prev.path : ''}/${item}`,
      })

      return group
    }, [] as LinkItem[])

  return [
    { label: 'Home', path: '/' },
    ...reducedPathItems,
  ]
})
</script>

<template>
  <div class="vui-sidebar-layout">
    <Sidebar>
      <template #header>
        <Flex class="mb-s">
          <h4>VUI</h4>
          <div class="flex-1" />
          <Button square>
            <Icon name="ph:search" />
          </Button>
        </Flex>
        <hr>
      </template>
      <DropdownItem
        v-for="subPage in subPagesToRender"
        :key="subPage.path"
        @click="router.push(subPage.path)"
      >
        {{ subPage.label }}
      </DropdownItem>
    </Sidebar>

    <main>
      <div class="container container-m">
        <Tabs v-model="currentTab" expand class="docs-tabs">
          <Tab v-for="value in availableTabs" :key="value" :value />
        </Tabs>

        <Breadcrumbs class="mb-s">
          <BreadcrumbItem v-for="item in breadcrumbItems" :key="item.path" @click="router.push(item.path)">
            {{ item.label }}
          </BreadcrumbItem>
        </Breadcrumbs>

        <article class="typeface">
          <slot />
        </article>

        <Flex v-if="prevAndNext">
          <Button v-if="prevAndNext.prev" expand size="l" outline @click="router.push(prevAndNext.prev.path)">
            <template #start>
              <Icon name="ph:caret-left" />
            </template>
            {{ prevAndNext.prev.label }}
          </Button>

          <Button v-if="prevAndNext.next" expand size="l" outline @click="router.push(prevAndNext.next.path)">
            {{ prevAndNext.next.label }}
            <template #start>
              <Icon name="ph:caret-right" />
            </template>
          </Button>
        </Flex>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.docs-tabs {
  position: sticky;
  top: 0;
  margin-bottom: 128px;
}
</style>
