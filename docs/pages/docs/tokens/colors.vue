<script setup lang="ts">
import { Button, Input, searchString, Tab, Tabs } from '@dolanske/vui'
import { useColorMode } from '@vueuse/core'
import NoResults from '~/components/list/NoResults.vue'
import { darkThemeTokens, lightThemeTokens } from '~/utils/constants'
import { removeColorPrefix } from '~/utils/format'

const currentTheme = useColorMode()
const themeTab = ref(currentTheme.value)

const search = ref('')

const filteredColorList = computed(() => {
  const colors = themeTab.value === 'dark' ? darkThemeTokens : lightThemeTokens
  return colors.filter(({ name, token }) => searchString([name, removeColorPrefix(token)], search.value))
})
</script>

<template>
  <div>
    <h1>Colors</h1>
    <p>
      The VUI design system uses CSS custom properties (variables) to manage its color system. These variables are built using theme-specific color tokens that define the core palette.
    </p>

    <p class="mb-l">
      The active theme determines which values are assigned to these top-level variables. VUI includes both <code>light</code> and <code>dark</code> themes by default, but the system is extensible, allowing users to create and implement their own custom themes. Learn more about
      <!-- eslint-disable-next-line -->
      <NuxtLink href="/docs/tokens/theming">theme configuration</NuxtLink>.
    </p>

    <Input v-model="search" placeholder="Search color tokens..." class="mb-m w-40">
      <template #start>
        <Icon name="ph:magnifying-glass" />
      </template>
      <template #end>
        <Button v-if="search" plain square @click="search = ''">
          <Icon name="ph:x" />
        </Button>
      </template>
    </Input>

    <Tabs v-model="themeTab" class="mb-l">
      <Tab value="light">
        Light
      </Tab>
      <Tab value="dark">
        Dark
      </Tab>
    </Tabs>

    <template v-if="filteredColorList.length > 0">
      <DocsColorItem
        v-for="item in filteredColorList"
        :key="item.name"
        v-bind="{ ...item }"
      />
    </template>
    <NoResults
      v-else
      :search="search"
      @clear="search = ''"
    />
  </div>
</template>
