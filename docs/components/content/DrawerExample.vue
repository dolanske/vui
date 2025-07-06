<script setup lang="ts">
import { Button, Drawer, Flex } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Button variant="fill" @click="isOpen = true">
          Open Drawer
        </Button>

        <Drawer :open="isOpen" title="Settings" container-size="m" @close="isOpen = false">
          <h2 class="mb-s">
            Drawer Content
          </h2>
          <p class="mb-l">
            This is the content of the drawer.
          </p>
          <Button variant="fill" @click="isOpen = false">
            Close
          </Button>
        </Drawer>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style scoped>
:deep(p) {
  margin: 0;
}
</style>
