<script setup>
import { Button, Flex, pushToast, removeToast } from '@dolanske/vui'

function showPersistentToast() {
  pushToast('Important message', {
    persist: true,
    description: 'This toast will stay until manually dismissed',
    action: {
      label: 'Close',
      handler: (toastId) => {
        removeToast(toastId)
      },
    },
  })
}
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex gap="l" x-center>
        <Button @click="showPersistentToast">
          Show Persistent Toast
        </Button>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
