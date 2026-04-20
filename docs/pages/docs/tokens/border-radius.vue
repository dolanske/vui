<script setup lang="ts">
import TokenItem from '~/components/docs/TokenItem.vue'
import { borderRadiusTokens } from '~/utils/constants'
</script>

<template>
  <div>
    <h1>Border Radius</h1>
    <p class="mb-xl">
      Border radius tokens define the corner curvature used across surfaces, inputs, overlays, and pill-shaped elements. Using the shared radius scale keeps components visually consistent.
    </p>

    <TokenItem
      v-for="item in borderRadiusTokens"
      :key="item.token"
      :name="item.name"
      :class-name="item.token"
      :copyable="false"
      prefix=""
    >
      <template #indicator>
        <div class="radius-indicator-wrap">
          <div class="radius-indicator" :style="{ borderRadius: item.size }" />
        </div>
      </template>
      <template #value>
        {{ item.size }}
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
.radius-indicator-wrap {
  width: 144px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-text-lightest);
  border-radius: var(--border-radius-m);
}

.radius-indicator {
  width: 96px;
  height: 40px;
  background-color: var(--color-bg);
  box-shadow: var(--box-shadow);
}
</style>
