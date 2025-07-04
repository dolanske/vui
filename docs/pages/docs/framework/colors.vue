<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { darkThemeTokens, lightThemeTokens } from '~/utils/constants'

const currentTheme = useColorMode()
const themeTab = ref(currentTheme.value)

const lightTextColors = lightThemeTokens
  .filter(token => token.token.includes('text') || token.token.endsWith('accent'))
  .map(token => ({
    token: token.token.replace('--light-color-', '').replace('-', '-color-'),
    name: token.name,
    cssVariable: token.token,
    hex: token.hex,
    rgb: token.rgb,
  }))

const darkTextColors = darkThemeTokens
  .filter(token => token.token.includes('text') || token.token.endsWith('accent'))
  .map(token => ({
    token: token.token.replace('--dark-color-', '').replace('-', '-color-'),
    name: token.name,
    cssVariable: token.token,
    hex: token.hex,
    rgb: token.rgb,
  }))

const filteredColorList = computed(() => {
  return themeTab.value === 'dark' ? darkTextColors : lightTextColors
  // return colors.filter(({ name, token }) => searchString([name, removeColorPrefix(token)], search.value))
})
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
