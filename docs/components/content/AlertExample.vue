<script setup lang="ts">
import { Alert, Flex } from '@dolanske/vui'

const variants = ['neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex column ga="s">
        <Alert v-for="variant in variants" :key="variant" :variant filled>
          <p class="m-0">
            This is a {{ variant }} alert
          </p>
        </Alert>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
