<script setup lang="ts">
import { Card, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Card centered border-style="dashed" style="--vui-card-border-color: var(--color-text-red); --vui-card-background-color: transparent;">
          <Icon name="ph:warning-circle" :size="40" class="mb-m text-color-red" />
          <strong class="text-bold text-l mb-s">Something went wrong</strong>
          <p class="text-color-lighter">
            We couldn't process your request. Please try again later.
          </p>
        </Card>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
