<script setup lang="ts">
import { Badge } from '@dolanske/vui'

const variants = ['neutral', 'danger', 'warning', 'success', 'info', 'accent'] as const
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Badge v-for="variant in variants" :key="variant" :variant filled>
          Badge
        </Badge>
      </Flex>
      <Divider :size="48" />
      <Flex x-center>
        <Badge v-for="variant in variants" :key="variant" :variant>
          Badge
        </Badge>
      </Flex>
      <Divider :size="48" />
      <Flex x-center>
        <Badge v-for="variant in variants" :key="variant" :variant outline>
          Badge
        </Badge>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
  <!-- <Badge>Badge</Badge> -->
</template>
