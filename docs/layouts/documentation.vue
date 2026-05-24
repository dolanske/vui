<script setup lang="ts">
import type { LinkItem } from '~/types/shared'
import { Badge, BreadcrumbItem, Breadcrumbs, Button, Divider, DropdownItem, Flex, Grid, Sidebar, Tab, Tabs, useBreakpoint } from '@dolanske/vui'
import { useColorMode, whenever } from '@vueuse/core'
import { libraryPages } from '~/utils/constants'
import { normalizePath } from '~/utils/format'

const route = useRoute()
const router = useRouter()
const colorMode = useColorMode()
const mainScrollEl = ref<HTMLElement | null>(null)

type AvailableTabs = 'Tokens' | 'Classes' | 'Components' | 'Library'

const currentTab = ref<AvailableTabs | ''>('')

const subPages: Record<AvailableTabs, LinkItem[]> = {
  Tokens: tokenPages,
  Classes: frameworkPages,
  Components: componentPages,
  Library: libraryPages,
}

// When mounting, we need to first keep tabs in sync with the URL. So loop over
// states and set the active tab to the correct one
watch(() => route.fullPath, (currentPath) => {
  // The root page is always the first one in the list
  const tokensPath = subPages.Tokens[0]!
  const cssFrameworkPath = subPages.Classes[0]!
  const componentsPath = subPages.Components[0]!
  const libraryPath = subPages.Library[0]!
  // const currentPath = route.fullPath

  // Root docs page is active, so set active tab to nothing
  if (currentPath.endsWith('/docs')) {
    currentTab.value = ''
  }
  else if (currentPath.includes(tokensPath.path)) {
    currentTab.value = 'Tokens'
  }
  else if (currentPath.includes(cssFrameworkPath.path)) {
    currentTab.value = 'Classes'
  }
  else if (currentPath.includes(componentsPath.path)) {
    currentTab.value = 'Components'
  }
  else if (currentPath.includes(libraryPath.path)) {
    currentTab.value = 'Library'
  }
}, {
  immediate: true,
  flush: 'post',
})

// Docs layout scrolls inside <main>, so reset that container on every route
// navigation instead of relying on window/router scroll restoration.
watch(() => route.fullPath, () => {
  nextTick(() => {
    mainScrollEl.value?.scrollTo({ left: 0, top: 0, behavior: 'auto' })
  })
}, {
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

  const activePath = normalizePath(route.path)
  const indexOfActive = subPagesToRender.value.findIndex(item => activePath === normalizePath(item.path))

  if (indexOfActive === -1)
    return null

  return {
    prev: subPagesToRender.value[indexOfActive - 1],
    next: subPagesToRender.value[indexOfActive + 1],
  }
})

// Reset to default route when main context changes
watch(subPagesToRender, (pages) => {
  if (!pages)
    return

  const activePath = normalizePath(route.path)
  const isInsideCurrentSection = pages.some(page => normalizePath(page.path) === activePath)

  // TODO: fix, still goes to tokens instead of top-level routes like projects

  // Only redirect to a section root when switching contexts from a non-section route,
  // but do NOT redirect if on /docs root.
  if (!isInsideCurrentSection && activePath !== '/docs')
    router.replace(pages[0]!.path)
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

function pushPage(page: string) {
  router.push(page)
}

const persistentSidebarLinks = computed(() => {
  const links = [...globalLinks]
  return subPagesToRender.value ? links : links.concat(documentationTabs)
})

// Fetch the latest version from the npm registry
const version = ref('unknown')
onBeforeMount(async () => {
  version.value = await $fetch('https://registry.npmjs.org/@dolanske/vui')
    .then((res: any) => {
      return res['dist-tags']?.latest
    })
    .catch(() => {
      return 'unknown'
    })
})

// Mobile sidebar
const sidebarOpen = ref(true)
// @ts-expect-error bad library export type
const isMobile = useBreakpoint('tablet')

watch(isMobile, () => {
  if (isMobile.value) {
    sidebarOpen.value = false
  }
}, { immediate: true })
whenever(isMobile, () => sidebarOpen.value = false, { immediate: true })
</script>

<template>
  <div class="vui-sidebar-layout" vaul-drawer-wrapper>
    <Sidebar v-model="sidebarOpen" class="app-sidebar" :width="232">
      <template #header>
        <Flex class="mb-s" y-center>
          <NuxtLink to="/">
            <img src="/logo.svg" alt="VUI logo" class="vui-logo-image">
          </NuxtLink>

          <h5>VUI.</h5>
          <div class="flex-1" />
          <Commands />
        </Flex>
        <Divider class="my-xs" />

        <!-- Always-present pages -->
        <NuxtLink v-for="link in persistentSidebarLinks" :key="link.path" :to="link.path" @click="currentTab = ''">
          <DropdownItem :class="{ active: route.path.endsWith(link.path) }">
            {{ link.label }}
          </DropdownItem>
        </NuxtLink>

        <Divider v-show="subPagesToRender" class="my-xs" />
      </template>

      <template #footer>
        <Divider class="my-xs" />
        <!-- Bind color for these specific styles -->
        <Flex y-center gap="xs" :style="{ '--color-text-light': 'var(--color-text-invert)' }">
          <Button size="s" square variant="fill" @click="colorMode = colorMode === 'dark' ? 'light' : 'dark'">
            <Icon :name="colorMode === 'dark' ? 'ph:sun' : 'ph:moon'" />
          </Button>
          <Button size="s" square variant="fill" href="https://github.com/dolanske/vui" target="_blank">
            <Icon name="ph:github-logo" />
          </Button>
          <div class="flex-1" />
          <span class="text-s color-text-lightest">{{ version }}</span>
        </Flex>
      </template>

      <span class="pl-xs text-xs block mb-s text-semibold">
        {{ currentTab }}
      </span>

      <DropdownItem
        v-for="subPage in subPagesToRender"
        :key="subPage.path"
        class="sidebar-item"
        :class="{ active: route.fullPath.endsWith(subPage.path) }"
        @click="pushPage(subPage.path)"
      >
        {{ subPage.label }}

        <template #hint>
          <Badge v-if="subPage?.status === 'new'" size="s" outline variant="accent">
            New
          </Badge>
          <Tooltip v-else-if="subPage?.status === 'update'">
            <Badge size="s" circle>
              <Icon name="ph:circle" />
            </Badge>
            <template #tooltip>
              <p>Updated</p>
            </template>
          </Tooltip>
        </template>
      </DropdownItem>
    </Sidebar>

    <main ref="mainScrollEl">
      <div class="container container-m">
        <Tabs v-model="currentTab" expand class="docs-tabs">
          <Tab v-for="item in documentationTabs" :key="item.label" :value="item.label">
            <Icon :name="item.icon" />
            {{ item.label }}
          </Tab>
        </Tabs>
        <div class="app-breadcrumbs">
          <Button size="s" square plain @click="sidebarOpen = !sidebarOpen">
            <Icon name="ph:sidebar" />
          </Button>
          <Breadcrumbs>
            <BreadcrumbItem v-for="item in breadcrumbItems" :key="item.path">
              <Button variant="link" @click="pushPage(item.path)">
                {{ item.label }}
              </Button>
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>

        <article class="typeset">
          <slot />
        </article>

        <Grid v-if="prevAndNext" :columns="2" class="docs-bottom-navigation">
          <Button v-if="prevAndNext.prev" expand size="l" outline @click="pushPage(prevAndNext.prev.path)">
            <template #start>
              <Flex column gap="xs">
                <Icon name="ph:caret-left" size="18" />
                <p>{{ prevAndNext.prev.label }}</p>
              </Flex>
            </template>
          </Button>
          <div v-else />

          <Button v-if="prevAndNext.next" expand size="l" outline @click="pushPage(prevAndNext.next.path)">
            <template #end>
              <Flex column gap="xs" y-end>
                <Icon name="ph:caret-right" size="18" />
                <p>{{ prevAndNext.next.label }}</p>
              </Flex>
            </template>
          </Button>
          <div v-else />
        </Grid>
      </div>
    </main>
  </div>
</template>

<style>
:root {
  --docs-tab-height: 64px;
}

.vui-logo-image {
  width: 32px;
  height: 32px;
  margin-block: 3px;
}

.app-sidebar {
  .vui-divider {
    width: auto;
    margin-inline: calc(var(--space-s) * -1);
  }

  .vui-dropdown-item {
    margin: 0;
    --interactive-el-height: 32px;

    .vui-dropdown-item-slot {
      color: var(--color-text-light);
    }

    &.active,
    &:hover {
      background-color: var(--color-bg-raised);
    }

    &.active {
      .vui-dropdown-item-slot {
        color: var(--color-accent) !important;
      }
    }
  }

  .vui-sidebar {
    background-color: var(--color-bg-medium);
  }
}

.app-breadcrumbs {
  display: flex;
  align-items: center;
  gap: var(--space-s);
  margin-bottom: var(--space-s);
  position: sticky;
  top: calc(var(--docs-tab-height) + 1px);
  z-index: var(--z-sticky);
  background-color: var(--color-bg);

  .vui-button-variant-link {
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

.docs-tabs {
  position: sticky;
  top: 0;
  margin-bottom: 72px;
  background-color: var(--color-bg);
  z-index: 100;

  .vui-tab {
    height: var(--docs-tab-height);
    font-size: var(--font-size-m);
  }
}

.docs-bottom-navigation {
  margin-top: 128px;

  .vui-button .vui-button-slot {
    display: block !important;
  }

  .vui-button {
    padding: var(--space-m);
    height: 80px;

    &:first-of-type {
      justify-content: flex-start;
    }

    &:last-of-type {
      justify-content: flex-end;
    }
  }
}

@media screen and (max-width: 768px) {
  .app-breadcrumbs {
    top: 0;
  }

  .docs-tabs {
    margin-bottom: var(--space-m);
    top: unset;
    position: fixed;
    bottom: 0;

    .vui-tab {
      flex-direction: column;
      font-size: var(--font-size-s);
    }
  }
}
</style>
