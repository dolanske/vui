<script setup lang="ts">
import { Badge } from '@dolanske/vui'

// const variants = ['neutral', 'danger', 'warning', 'success', 'info', 'accent'] as const
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center y-center>
        <Badge size="s" variant="info">
          New
        </Badge>
        <Badge>
          Overview
        </Badge>
        <Badge variant="success" outline>
          <Icon name="ph:bell" />
          Subscribed
        </Badge>
        <Badge circle filled variant="warning">
          12
        </Badge>
        <Badge size="l" variant="accent">
          Admin
        </Badge>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
  <!-- <Badge>Badge</Badge> -->
</template>
