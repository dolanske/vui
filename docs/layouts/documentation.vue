<script setup lang="ts">
import type { LinkItem } from '~/types/shared'
import { Badge, BreadcrumbItem, Breadcrumbs, Button, Divider, DropdownItem, Flex, Grid, Sidebar, Tab, Tabs } from '@dolanske/vui'
import { useColorMode, useMediaQuery } from '@vueuse/core'
import { capitalize } from 'vue'
import { libraryPages } from '~/utils/constants'
import { normalizePath } from '~/utils/format'

const route = useRoute()
const router = useRouter()
const colorMode = useColorMode()
const mainScrollEl = ref<HTMLElement | null>(null)

type AvailableTabs = 'Tokens' | 'Classes' | 'Components' | 'Library'

const currentTab = ref<AvailableTabs | ''>('')
const lastTabSelection = ref<AvailableTabs>('Tokens')

const subPages: Record<AvailableTabs, LinkItem[]> = {
  Tokens: tokenPages,
  Classes: frameworkPages,
  Components: componentPages,
  Library: libraryPages,
}

// Top-level docs pages that should not be controlled by tab state.
// Add future standalone pages here.
const standaloneDocsPages = ['/docs', '/docs/projects']

function normalizeRoutePath(path: string) {
  return normalizePath(path.split('?')[0]!.split('#')[0]!)
}

function getTabForPath(path: string): AvailableTabs | '' {
  const normalizedPath = normalizeRoutePath(path)

  if (standaloneDocsPages.includes(normalizedPath))
    return ''

  const tabEntry = Object.entries(subPages)
    .find(([, pages]) => pages.some(page => normalizedPath.startsWith(normalizePath(page.path))))

  return (tabEntry?.[0] as AvailableTabs | undefined) ?? ''
}

// When mounting, we need to first keep tabs in sync with the URL. So loop over
// states and set the active tab to the correct one
watch(() => route.fullPath, (currentPath) => {
  const tab = getTabForPath(currentPath)

  currentTab.value = tab

  if (tab)
    lastTabSelection.value = tab
}, {
  immediate: true,
  flush: 'pre',
})

const tabsModelValue = computed<AvailableTabs>(() => {
  return currentTab.value || lastTabSelection.value
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

// Combine current route path into clickable links
const breadcrumbItems = computed(() => {
  const reducedPathItems = route.path
    .substring(1, route.path.length)
    .split('/')
    .reduce((group, item) => {
      const prev = group.at(-1)

      group.push({
        label: capitalize(item.toLowerCase().replaceAll('-', ' ')),
        path: `${prev ? prev.path : ''}/${item}`,
      })

      return group
    }, [] as LinkItem[])

  return [
    { label: 'Home', path: '/' },
    ...reducedPathItems,
  ]
})

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
const isTablet = useMediaQuery('(max-width: 768px)')
const sidebarOpen = ref(!isTablet.value)

watch(isTablet, (tablet) => {
  if (tablet) {
    sidebarOpen.value = false
  }
  else {
    sidebarOpen.value = true
  }
}, { immediate: true, flush: 'post' })

function pushPage(page: string) {
  if (isTablet.value) {
    sidebarOpen.value = false
  }

  router.push(page)
}

function handleTabChange(tab: AvailableTabs) {
  lastTabSelection.value = tab

  const defaultPage = subPages[tab][0]?.path

  if (defaultPage)
    pushPage(defaultPage)
}
</script>

<template>
  <div class="vui-sidebar-layout" vaul-drawer-wrapper>
    <ClientOnly>
      <Sidebar v-model="sidebarOpen" class="app-sidebar" :width="232" :floaty="isTablet">
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
    </ClientOnly>

    <main ref="mainScrollEl">
      <div class="container container-m">
        <ClientOnly>
          <Tabs
            :model-value="tabsModelValue"
            expand
            class="docs-tabs"
            :variant="isTablet ? 'filled' : 'default'"
            @update:model-value="handleTabChange"
          >
            <Tab v-for="item in documentationTabs" :key="item.label" :value="item.label">
              <Icon :name="item.icon" />
              {{ item.label }}
            </Tab>
          </Tabs>
        </ClientOnly>
        <div class="app-breadcrumbs">
          <Button size="s" square plain class="mr-xs" @click="sidebarOpen = !sidebarOpen">
            <Icon name="ph:sidebar" />
          </Button>
          <Breadcrumbs>
            <BreadcrumbItem v-for="item in breadcrumbItems" :key="item.path">
              <Button variant="link" @click="pushPage(item.path)">
                {{ item.label }}
              </Button>
            </BreadcrumbItem>
          </Breadcrumbs>
          <div class="flex-1" />
          <ClientOnly>
            <NuxtLink v-if="isTablet" to="/">
              <img src="/logo.svg" alt="VUI logo" class="vui-logo-image small">
            </NuxtLink>
          </ClientOnly>
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

  &.small {
    width: 20px;
    height: 20px;
    margin-block: 0;
    transform: translateY(2px);
  }
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

  .docs-bottom-navigation {
    margin-top: 32px;
    padding-bottom: 64px;
  }

  .docs-tabs {
    margin-bottom: 0;
    top: unset;
    position: fixed;
    bottom: var(--space-xs);
    left: var(--space-xs);
    width: auto;
    right: var(--space-xs);
    border-radius: var(--border-radius-m);
    background-color: var(--color-bg-lowered) !important;
    /* border: 1px solid var(--color-border) !important; */
    box-shadow: var(--box-shadow-strong);
    z-index: var(--z-sticky) !important;

    .vui-tab-underline {
      background-color: var(--color-bg-medium) !important;
    }

    .vui-tab {
      flex-direction: column;
      font-size: var(--font-size-s);
    }
  }
}

@media screen and (max-width: 480px) {
  .docs-tabs .vui-tab {
    font-size: var(--font-size-xs);
  }
}
</style>
