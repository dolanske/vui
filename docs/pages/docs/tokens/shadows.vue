<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import TokenItem from '~/components/docs/TokenItem.vue'
import { darkShadowTokens, lightShadowTokens } from '~/utils/constants'

const currentTheme = useColorMode()
const themeTab = ref(currentTheme.value)

const filteredShadowList = computed(() => themeTab.value === 'dark' ? darkShadowTokens : lightShadowTokens)
</script>

<template>
  <div>
    <h1>Shadows</h1>
    <p>
      Shadow tokens define the elevation treatment for floating UI such as tooltips, dropdowns, and overlays. VUI maps these theme-specific values to semantic aliases so components can use a consistent token regardless of active theme.
    </p>

    <p class="mb-l">
      The semantic aliases are <code>--box-shadow</code> and <code>--box-shadow-strong</code>. Their concrete values change with the active theme.
    </p>

    <Tabs v-model="themeTab" class="mb-l">
      <Tab value="light">
        Light
      </Tab>
      <Tab value="dark">
        Dark
      </Tab>
    </Tabs>

    <TokenItem
      v-for="item in filteredShadowList"
      :key="item.token"
      :name="item.name"
      :class-name="item.token"
      :copyable="false"
      prefix=""
    >
      <template #indicator>
        <div class="shadow-indicator-wrap" :class="{ light: themeTab === 'light' }">
          <div class="shadow-indicator" :style="{ boxShadow: item.value }" />
        </div>
      </template>
      <template #value>
        {{ item.value }}
      </template>
      <template #actions>
        <CopyClipboard :text="item.token" confirm="Copied!">
          <Button plain>
            <template #start>
              <Badge>
                {{ item.token }}
              </Badge>
            </template>
            <template #end>
              <Icon name="ph:copy" size="18" />
            </template>
          </Button>
        </CopyClipboard>
      </template>
    </TokenItem>
  </div>
</template>

<style scoped lang="scss">
.shadow-indicator-wrap {
  width: 144px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dark-color-text-lightest);
  border-radius: var(--border-radius-m);

  &.light {
    background-color: var(--light-color-bg);

    .shadow-indicator {
      background-color: var(--light-color-bg);
    }
  }

  .shadow-indicator {
    width: 96px;
    height: 40px;
    border-radius: var(--border-radius-m);
    background-color: var(--dark-color-bg);
  }
}
</style>
