<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { darkTextClasses, lightTextClasses } from '~/utils/constants'

const currentTheme = useColorMode()
const themeTab = ref(currentTheme.value)

const filteredColorList = computed(() => themeTab.value === 'dark' ? darkTextClasses : lightTextClasses)
</script>

<template>
  <div>
    <h1>Colors</h1>
    <p>VUI provides utility classes for changing text colors throughout your application. While it's recommended to define colors through CSS custom properties and design tokens, these utility classes offer a convenient way to apply text colors directly in your markup for rapid development and prototyping.</p>

    <h3>Text</h3>

    <p class="mb-l">
      The following table lists all available text color utility classes
    </p>

    <Tabs v-model="themeTab" class="mb-l">
      <Tab value="light">
        Light
      </Tab>
      <Tab value="dark">
        Dark
      </Tab>
    </Tabs>

    <DocsTextColorItem
      v-for="item in filteredColorList"
      :key="item.name"
      v-bind="{ ...item }"
    />
  </div>
</template>
