<script setup lang="ts">
import { Button, Card, Input, searchString, Tab, Tabs } from '@dolanske/vui'
import { useColorMode } from '@vueuse/core'
import { removeColorPrefix } from '~/utils/format'

const currentTheme = useColorMode()
const themeTab = ref(currentTheme.value)

const darkThemeTokens = [
  { name: 'Background', token: '--dark-color-bg', rgb: 'rgb(17, 17, 17)', hex: '#111111' },
  { name: 'Background Raised', token: '--dark-color-bg-raised', rgb: 'rgb(28, 28, 28)', hex: '#1C1C1C' },
  { name: 'Background Medium', token: '--dark-color-bg-medium', rgb: 'rgb(22, 22, 22)', hex: '#161616' },
  { name: 'Background Lowered', token: '--dark-color-bg-lowered', rgb: 'rgb(12, 12, 12)', hex: '#0C0C0C' },
  { name: 'Text', token: '--dark-color-text', rgb: 'rgb(231, 231, 231)', hex: '#E7E7E7' },
  { name: 'Text Light', token: '--dark-color-text-light', rgb: 'rgb(180, 180, 180)', hex: '#B4B4B4' },
  { name: 'Text Lighter', token: '--dark-color-text-lighter', rgb: 'rgb(90, 90, 90)', hex: '#5A5A5A' },
  { name: 'Text Lightest', token: '--dark-color-text-lightest', rgb: 'rgb(65, 65, 65)', hex: '#414141' },
  { name: 'Text Invert', token: '--dark-color-text-invert', rgb: 'rgb(17, 17, 17)', hex: '#111111' },
  { name: 'Button Gray', token: '--dark-color-button-gray', rgb: 'rgb(46, 46, 46)', hex: '#2E2E2E' },
  { name: 'Button Gray Hover', token: '--dark-color-button-gray-hover', rgb: 'rgb(38, 38, 38)', hex: '#262626' },
  { name: 'Button Fill', token: '--dark-color-button-fill', rgb: 'rgb(250, 250, 250)', hex: '#FAFAFA' },
  { name: 'Button Fill Hover', token: '--dark-color-button-fill-hover', rgb: 'rgb(210, 210, 210)', hex: '#D2D2D2' },
  { name: 'Text Red', token: '--dark-color-text-red', rgb: 'rgb(243, 78, 70)', hex: '#F34E46' },
  { name: 'Background Red Lowered', token: '--dark-color-bg-red-lowered', rgb: 'rgb(104, 24, 24)', hex: '#681818' },
  { name: 'Background Red Raised', token: '--dark-color-bg-red-raised', rgb: 'rgb(127, 29, 29)', hex: '#7F1D1D' },
  { name: 'Text Green', token: '--dark-color-text-green', rgb: 'rgb(106, 207, 48)', hex: '#6ACF30' },
  { name: 'Background Green Lowered', token: '--dark-color-bg-green-lowered', rgb: 'rgb(40, 95, 8)', hex: '#285F08' },
  { name: 'Background Green Raised', token: '--dark-color-bg-green-raised', rgb: 'rgb(26, 122, 13)', hex: '#1A7A0D' },
  { name: 'Text Yellow', token: '--dark-color-text-yellow', rgb: 'rgb(255, 193, 7)', hex: '#FFC107' },
  { name: 'Background Yellow Lowered', token: '--dark-color-bg-yellow-lowered', rgb: 'rgb(78, 52, 0)', hex: '#4E3400' },
  { name: 'Background Yellow Raised', token: '--dark-color-bg-yellow-raised', rgb: 'rgb(152, 104, 0)', hex: '#986800' },
  { name: 'Text Blue', token: '--dark-color-text-blue', rgb: 'rgb(85, 141, 245)', hex: '#558DF5' },
  { name: 'Background Blue Lowered', token: '--dark-color-bg-blue-lowered', rgb: 'rgb(13, 32, 74)', hex: '#0D204A' },
  { name: 'Background Blue Raised', token: '--dark-color-bg-blue-raised', rgb: 'rgb(26, 59, 119)', hex: '#1A3B77' },
  { name: 'Border', token: '--dark-color-border', rgb: 'rgb(40, 40, 40)', hex: '#282828' },
  { name: 'Border Strong', token: '--dark-color-border-strong', rgb: 'rgb(54, 54, 54)', hex: '#363636' },
  { name: 'Border Weak', token: '--dark-color-border-weak', rgb: 'rgb(36, 36, 36)', hex: '#242424' },
  { name: 'Accent', token: '--dark-color-accent', rgb: 'rgb(193, 118, 255)', hex: '#C176FF' },
  { name: 'Background Accent Raised', token: '--dark-color-bg-accent-raised', rgb: 'Inferred from the accent color. 40% darker', hex: null },
  { name: 'Background Accent Lowered', token: '--dark-color-bg-accent-lowered', rgb: 'Inferred from the accent color. 55% darker', hex: null },
]

const lightThemeTokens = [
  { name: 'Background', token: '--light-color-bg', rgb: 'rgb(246, 246, 246)', hex: '#F6F6F6' },
  { name: 'Background Raised', token: '--light-color-bg-raised', rgb: 'rgb(222, 222, 222)', hex: '#DEDEDE' },
  { name: 'Background Medium', token: '--light-color-bg-medium', rgb: 'rgb(236, 236, 236)', hex: '#ECECEC' },
  { name: 'Background Lowered', token: '--light-color-bg-lowered', rgb: 'rgb(255, 255, 255)', hex: '#FFFFFF' },
  { name: 'Text', token: '--light-color-text', rgb: 'rgb(8, 8, 8)', hex: '#080808' },
  { name: 'Text Light', token: '--light-color-text-light', rgb: 'rgb(64, 64, 64)', hex: '#404040' },
  { name: 'Text Lighter', token: '--light-color-text-lighter', rgb: 'rgb(92, 92, 92)', hex: '#5C5C5C' },
  { name: 'Text Lightest', token: '--light-color-text-lightest', rgb: 'rgb(128, 128, 128)', hex: '#808080' },
  { name: 'Text Invert', token: '--light-color-text-invert', rgb: 'rgb(248, 248, 248)', hex: '#F8F8F8' },
  { name: 'Button Gray', token: '--light-color-button-gray', rgb: 'rgb(224, 224, 224)', hex: '#E0E0E0' },
  { name: 'Button Gray Hover', token: '--light-color-button-gray-hover', rgb: 'rgb(198, 198, 198)', hex: '#C6C6C6' },
  { name: 'Button Fill', token: '--light-color-button-fill', rgb: 'rgb(12, 12, 12)', hex: '#0C0C0C' },
  { name: 'Button Fill Hover', token: '--light-color-button-fill-hover', rgb: 'rgb(52, 52, 52)', hex: '#343434' },
  { name: 'Text Red', token: '--light-color-text-red', rgb: 'rgb(209, 60, 52)', hex: '#D13C34' },
  { name: 'Background Red Lowered', token: '--light-color-bg-red-lowered', rgb: 'rgb(172, 45, 45)', hex: '#AC2D2D' },
  { name: 'Background Red Raised', token: '--light-color-bg-red-raised', rgb: 'rgb(220, 38, 38)', hex: '#DC2626' },
  { name: 'Text Green', token: '--light-color-text-green', rgb: 'rgb(77, 160, 29)', hex: '#4DA01D' },
  { name: 'Background Green Lowered', token: '--light-color-bg-green-lowered', rgb: 'rgb(42, 114, 19)', hex: '#2A7213' },
  { name: 'Background Green Raised', token: '--light-color-bg-green-raised', rgb: 'rgb(61, 146, 35)', hex: '#3D9223' },
  { name: 'Text Yellow', token: '--light-color-text-yellow', rgb: 'rgb(176, 129, 15)', hex: '#B0810F' },
  { name: 'Background Yellow Lowered', token: '--light-color-bg-yellow-lowered', rgb: 'rgb(230, 205, 137)', hex: '#E6CD89' },
  { name: 'Background Yellow Raised', token: '--light-color-bg-yellow-raised', rgb: 'rgb(253, 200, 86)', hex: '#FDC856' },
  { name: 'Text Blue', token: '--light-color-text-blue', rgb: 'rgb(85, 141, 245)', hex: '#558DF5' },
  { name: 'Background Blue Lowered', token: '--light-color-bg-blue-lowered', rgb: 'rgb(196, 214, 255)', hex: '#C4D6FF' },
  { name: 'Background Blue Raised', token: '--light-color-bg-blue-raised', rgb: 'rgb(136, 178, 255)', hex: '#88B2FF' },
  { name: 'Border', token: '--light-color-border', rgb: 'rgb(200, 200, 200)', hex: '#C8C8C8' },
  { name: 'Border Strong', token: '--light-color-border-strong', rgb: 'rgb(152, 152, 152)', hex: '#989898' },
  { name: 'Border Weak', token: '--light-color-border-weak', rgb: 'rgb(224, 224, 224)', hex: '#E0E0E0' },
  { name: 'Accent', token: '--light-color-accent', rgb: 'rgb(193, 118, 255)', hex: '#C176FF' },
  { name: 'Background Accent Raised', token: '--light-color-bg-accent-raised', rgb: 'Inferred from the accent color. 25% darker', hex: null },
  { name: 'Background Accent Lowered', token: '--light-color-bg-accent-lowered', rgb: 'Inferred from the accent color. 40% darker', hex: null },
]

const search = ref('')

const filteredColorList = computed(() => {
  const colors = themeTab.value === 'dark' ? darkThemeTokens : lightThemeTokens
  return colors.filter(({ name, token }) => searchString([name, removeColorPrefix(token)], search.value))
})
</script>

<template>
  <div>
    <h1>Colors</h1>
    <p class="mb-l">
      VUI theme is comprised of CSS variables. These variables are further composed of theme-specific tokens. Depending on the
      <!-- eslint-disable-next-line -->
      <NuxtLink href="/docs/tokens/theming">active theme</NuxtLink>, the top-level variables contain different values. By default, it comes with a <code>light</code> and <code>dark</code> themes, but users can define as many as they want.
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
    <div v-else class="colors-no-results">
      <p>No results found for "<strong>{{ search }}</strong>"</p>
      <Button variant="fill" @click="search = ''">
        Clear
      </Button>
    </div>
  </div>
</template>

<style scoped>
.colors-no-results {
  border: 1px solid var(--color-border);
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--space-m);

  strong {
    font-weight: var(--font-weight-semibold);
  }
}
</style>
