<script setup lang="ts">
import { Badge, Button, CopyClipboard } from '@dolanske/vui'
import { sizeTokens } from '~/utils/constants'
</script>

<template>
  <div>
    <h1>Spacing</h1>
    <p class="mb-xl">
      A set of predefined CSS variables that define consistent spacing values for <strong>margin</strong>, <strong>padding</strong>, and <strong>gap</strong> properties throughout your application. These spacing tokens help maintain visual harmony and consistent layout spacing across pages and components.
    </p>

    <div v-for="item in sizeTokens" :key="item.token" class="list-item">
      <div class="size-indicator-wrap">
        <div class="size-indicator" :style="{ width: item.size }" />
        <span>{{ item.size }}</span>
      </div>

      <div class="flex-1">
        <strong class="list-item-name">{{ item.name }}</strong>
      </div>

      <CopyClipboard :text="item.token" confirm="Copied!">
        <Button plain expand>
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
    </div>
  </div>
</template>

<style scoped lang="scss">
.size-indicator-wrap {
  display: flex;
  align-items: center;
  gap: var(--space-m);
  width: 156px;

  span {
    font-size: var(--font-size-s);
    color: var(--color-text-lighter);
  }

  .size-indicator {
    display: block;
    height: 1px;
    border-bottom: 1px solid var(--color-text-light);
    position: relative;

    &:before,
    &:after {
      content: '';
      height: 12px;
      width: 1px;
      background-color: var(--color-text-light);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -1px;
    }

    &:after {
      left: unset;
      right: -1px;
    }
  }
}
</style>
