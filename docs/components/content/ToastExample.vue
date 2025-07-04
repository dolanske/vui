<script setup>
import { Button, Flex, pushToast, removeToast } from '@dolanske/vui'

function showBasicToast() {
  pushToast('Operation successful. This toast will disappear in a bit so just look at it for a bit.')
}

function showActionToast() {
  pushToast('File deleted', {
    description: 'The file has been moved to trash',
    action: {
      label: 'Undo',
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
        <Button @click="showBasicToast">
          Show Basic Toast
        </Button>
        <Button @click="showActionToast">
          Show Action Toast
        </Button>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
