<script setup lang="ts">
import { Flex, Histogram } from '@dolanske/vui'

const data = [4, 9, 6, 2, 8, 5, 7, 3, 10, 1]
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center y-center>
        <Histogram :data style="max-width: 320px">
          <template #tooltip="{ value }">
            <p>Capacity: {{ value }}</p>
          </template>
        </Histogram>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
