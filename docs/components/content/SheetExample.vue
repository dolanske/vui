<script setup>
import { Button, Flex, Sheet } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex :gap="0" x-center>
        <Button @click="isOpen = true">
          Open Sheet
        </Button>

        <Sheet
          :open="isOpen"
          @close="isOpen = false"
        >
          <template #header>
            <h2>Sheet Title</h2>
          </template>

          <p>Sheet content goes here</p>

          <template #footer>
            <Button @click="isOpen = false">
              Close
            </Button>
          </template>
        </Sheet>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
