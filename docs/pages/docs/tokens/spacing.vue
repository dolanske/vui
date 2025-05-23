<script setup lang="ts">
import { Badge, Button, CopyClipboard } from '@dolanske/vui'

const sizes = [
  { token: '--space-xxs', size: '4px', name: 'XXS space ' },
  { token: '--space-xs', size: '8px', name: 'XS space ' },
  { token: '--space-s', size: '12px', name: 'S space ' },
  { token: '--space-m', size: '18px', name: 'M space ' },
  { token: '--space-l', size: '24px', name: 'L space ' },
  { token: '--space-xl', size: '34px', name: 'XL space ' },
  { token: '--space-xxl', size: '48px', name: 'XXL space ' },
  { token: '--space-xxxl', size: '64px', name: 'XXXL space ' },
]
</script>

<template>
  <div>
    <h1>Spacing</h1>
    <p class="mb-xl">
      A set of predefined CSS variables that define consistent spacing values for <strong>margin</strong>, <strong>padding</strong>, and <strong>gap</strong> properties throughout your application. These spacing tokens help maintain visual harmony and consistent layout spacing across pages and components.
    </p>

    <div v-for="item in sizes" :key="item.token" class="space-item">
      <div class="size-indicator-wrap">
        <div class="size-indicator" :style="{ width: item.size }" />
        <span>{{ item.size }}</span>
      </div>

      <div class="flex-1">
        <span>{{ item.name }}</span>
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
.space-item {
  display: flex;
  gap: var(--space-l);
  align-items: center;

  margin-bottom: var(--space-l);
  padding-bottom: var(--space-l);
  border-bottom: 1px solid var(--color-border-weak);

  &:last-of-type {
    border-bottom: none;
  }
}

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
