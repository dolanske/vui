<script setup lang="ts">
import type { LinkItem } from '~/types/shared'
import { BreadcrumbItem, Breadcrumbs, Button, Divider, DropdownItem, Flex, Grid, Sidebar, Tab, Tabs } from '@dolanske/vui'

const route = useRoute()
const router = useRouter()

type AvailableTabs = 'Style tokens' | 'CSS framework' | 'Components'

const currentTab = ref<AvailableTabs | ''>('')

// TODO: change to using query collection path
const subPages: Record<AvailableTabs, LinkItem[]> = {
  'Style tokens': [
    { label: 'Introduction', path: '/docs/tokens' },
    { label: 'Colors', path: '/docs/tokens/colors' },
    { label: 'Themes', path: '/docs/tokens/theming' },
    { label: 'Spacing', path: '/docs/tokens/spacing' },
    { label: 'Text', path: '/docs/tokens/text' },
    { label: 'Z-index', path: '/docs/tokens/z-index' },

  ],
  'CSS framework': [
    { label: 'Introduction', path: '/docs/framework' },
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
    { label: 'Introduction', path: '/docs/components' },
    ...componentList.map(component => ({
      label: component.name,
      path: component.path,
    })),
  ],
}

// When mounting, we need to first keep tabs in sync with the URL. So loop over
// states and set the active tab to the correct one
watch(() => route.fullPath, (currentPath) => {
  // The root page is always the first one in the list
  const tokensPath = subPages['Style tokens'][0]
  const cssFrameworkPath = subPages['CSS framework'][0]
  const componentsPath = subPages.Components[0]
  // const currentPath = route.fullPath

  // Root docs page is active, so set active tab to nothing
  if (currentPath.endsWith('/docs')) {
    currentTab.value = ''
  }
  else if (currentPath.includes(tokensPath.path)) {
    currentTab.value = 'Style tokens'
  }
  else if (currentPath.includes(cssFrameworkPath.path)) {
    currentTab.value = 'CSS framework'
  }
  else if (currentPath.includes(componentsPath.path)) {
    currentTab.value = 'Components'
  }
}, {
  immediate: true,
  flush: 'post',
})

const subPagesToRender = computed(() => {
  if (!currentTab.value)
    return null

  return subPages[currentTab.value]
})

const prevAndNext = computed(() => {
  if (!subPagesToRender.value)
    return null

  const indexOfActive = subPagesToRender.value.findIndex(item => route.path === item.path)

  if (indexOfActive === -1)
    return null

  return {
    prev: subPagesToRender.value[indexOfActive - 1],
    next: subPagesToRender.value[indexOfActive + 1],
  }
})

// Reset to default route when main context changes
watch(subPagesToRender, (pages) => {
  if (pages) {
    router.push(pages[0].path)
  }
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
    <Sidebar class="app-sidebar">
      <template #header>
        <Flex class="mb-s" y-center>
          <h5 class="vui-logo">
            VUI
          </h5>
          <div class="flex-1" />
          <Button square outline>
            <Icon name="ph:magnifying-glass" />
          </Button>
        </Flex>
        <hr>
      </template>
      <DropdownItem
        v-for="subPage in subPagesToRender"
        :key="subPage.path"
        class="sidebar-item"
        :class="{ active: route.fullPath.endsWith(subPage.path) }"
        @click="router.push(subPage.path)"
      >
        {{ subPage.label }}
      </DropdownItem>
    </Sidebar>

    <main>
      <div class="container container-m">
        <Tabs v-model="currentTab" expand class="docs-tabs">
          <Tab value="Style tokens">
            <Icon name="ph:brackets-curly" />
            Style tokens
          </Tab>
          <Tab value="CSS framework">
            <Icon name="ph:file-css" />
            CSS framework
          </Tab>
          <Tab value="Components">
            <Icon name="ph:rectangle-dashed" />
            Components
          </Tab>
        </Tabs>

        <Breadcrumbs class="app-breadcrumbs">
          <BreadcrumbItem v-for="item in breadcrumbItems" :key="item.path">
            <Button variant="link" @click="router.push(item.path)">
              {{ item.label }}
            </Button>
          </BreadcrumbItem>
        </Breadcrumbs>

        <article class="typeface">
          <slot />
        </article>

        <Divider class="pt-xxl pb-xl" />

        <Grid v-if="prevAndNext" :columns="2">
          <Button v-if="prevAndNext.prev" expand size="l" outline @click="router.push(prevAndNext.prev.path)">
            <template #start>
              <Icon name="ph:caret-left" />
            </template>
            {{ prevAndNext.prev.label }}
          </Button>
          <div v-else />

          <Button v-if="prevAndNext.next" expand size="l" outline @click="router.push(prevAndNext.next.path)">
            {{ prevAndNext.next.label }}
            <template #end>
              <Icon name="ph:caret-right" />
            </template>
          </Button>
          <div v-else />
        </Grid>
      </div>
    </main>
  </div>
</template>

<style>
.vui-logo {
  position: relative;
  padding-left: 46px;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 34px;
    height: 34px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  &:before {
    z-index: -1;
    background: #833ab4;
    background: linear-gradient(135deg, rgb(195, 46, 225) 0%, rgb(253, 115, 29) 50%, rgb(249, 212, 5) 100%);
  }

  &:after {
    z-index: 2;
    background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 4.55%,
      #000000 4.55%,
      rgba(0, 0, 0, 0) 54.55%,
      #000000 54.55%,
      #000000 100%
    );
    background-size: 6px 6px;
  }
}

.app-sidebar {
  .vui-sidebar {
    background-color: var(--color-bg-lowered);
  }

  .vui-dropdown-item {
    margin: 0;

    .vui-dropdown-item-slot {
      color: var(--color-text-light);
    }

    &:hover,
    &.active {
      .vui-dropdown-item-slot {
        color: var(--color-text) !important;
      }

      background-color: var(--color-bg-raised);
    }
  }
}

.app-breadcrumbs {
  margin-bottom: var(--space-s);

  .vui-button {
    padding-inline: 0;
    color: var(--color-text-lighter);
    text-transform: capitalize;

    &:hover {
      color: var(--color-text);
    }
  }
}

article {
  h1 {
    margin-bottom: var(--space-xl);
  }

  p {
    line-height: 1.5em;
  }
}
</style>

<style scoped lang="scss">
.docs-tabs {
  position: sticky;
  top: 0;
  margin-bottom: 96px;
  background-color: var(--color-bg);
  z-index: 1000;

  .vui-tab {
    height: 64px;
    font-size: var(--font-size-m);
  }
}
</style>
