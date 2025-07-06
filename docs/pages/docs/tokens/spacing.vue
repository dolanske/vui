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
