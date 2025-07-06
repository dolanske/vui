<script setup lang="ts">
import type { LinkItem } from '~/types/shared'
import { BreadcrumbItem, Breadcrumbs, Button, Divider, DropdownItem, Flex, Grid, Sidebar, Tab, Tabs } from '@dolanske/vui'
import { useColorMode } from '@vueuse/core'
import { RouterLink } from 'vue-router'

const route = useRoute()
const router = useRouter()
const colorMode = useColorMode()

type AvailableTabs = 'Style tokens' | 'CSS framework' | 'Components'

const currentTab = ref<AvailableTabs | ''>('')

const subPages: Record<AvailableTabs, LinkItem[]> = {
  'Style tokens': tokenPages,
  'CSS framework': frameworkPages,
  'Components': componentPages,
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

function pushPage(page: string) {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  router.push(page)
}

const persistentSidebarLinks = computed(() => {
  const links = [...globalLinks]

  return subPagesToRender.value ? links : links.concat(documentationTabs)
})
</script>

<template>
  <div class="vui-sidebar-layout" vaul-drawer-wrapper>
    <Sidebar class="app-sidebar" :width="196">
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

      <template #footer>
        <hr>
        <!-- Bind color for these specific styles -->
        <Flex y-center gap="xs" :style="{ '--color-text-light': 'var(--color-text-invert)' }">
          <Button size="s" square variant="fill" @click="colorMode = colorMode === 'dark' ? 'light' : 'dark'">
            <Icon :name="colorMode === 'dark' ? 'ph:sun' : 'ph:moon'" />
          </Button>
          <Button size="s" square variant="fill">
            <Icon name="ph:github-logo" />
          </Button>
          <div class="flex-1" />
          <span class="text-s color-text-lightest">VUI 1.4.6</span>
        </Flex>
      </template>

      <!-- Always-present pages -->
      <RouterLink v-for="link in persistentSidebarLinks" :key="link.path" :to="link.path">
        <DropdownItem :class="{ active: route.fullPath.endsWith(link.path) }">
          {{ link.label }}
        </DropdownItem>
      </RouterLink>

      <Divider v-show="subPagesToRender" />

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
      </DropdownItem>
    </Sidebar>

    <main>
      <div class="container container-m">
        <Tabs v-model="currentTab" expand class="docs-tabs">
          <Tab v-for="item in documentationTabs" :key="item.label" :value="item.label">
            <Icon :name="item.icon" />
            {{ item.label }}
          </Tab>
        </Tabs>

        <Breadcrumbs class="app-breadcrumbs">
          <BreadcrumbItem v-for="item in breadcrumbItems" :key="item.path">
            <Button variant="link" @click="pushPage(item.path)">
              {{ item.label }}
            </Button>
          </BreadcrumbItem>
        </Breadcrumbs>

        <article class="typeface">
          <slot />
        </article>

        <Grid v-if="prevAndNext" :columns="2" class="docs-bottom-navigation">
          <Button v-if="prevAndNext.prev" expand size="l" outline @click="pushPage(prevAndNext.prev.path)">
            <Flex column gap="xs">
              <Icon name="ph:arrow-left" size="18" />
              <p>{{ prevAndNext.prev.label }}</p>
            </Flex>
          </Button>
          <div v-else />

          <Button v-if="prevAndNext.next" expand size="l" outline @click="pushPage(prevAndNext.next.path)">
            <Flex column gap="xs" y-end>
              <Icon name="ph:arrow-right" size="18" />
              <p>{{ prevAndNext.next.label }}</p>
            </Flex>
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
      var(--color-text-invert) 4.55%,
      rgba(0, 0, 0, 0) 54.55%,
      var(--color-text-invert) 54.55%,
      var(--color-text-invert) 100%
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
  margin-bottom: 72px;
  background-color: var(--color-bg);
  z-index: 100;

  .vui-tab {
    height: 64px;
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
</style>
