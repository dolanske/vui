<script setup lang="ts">
import { Button, Drawer } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <DocsExample>
    <template #component>
      <div>
        <Button @click="isOpen = true">
          Open Drawer
        </Button>

        <Drawer v-model:open="isOpen" title="Settings">
          <div class="p-md">
            <h2 class="m-0 mb-md">
              Drawer Content
            </h2>
            <p class="m-0 mb-md">
              This is the content of the drawer.
            </p>
            <div class="flex justify-end">
              <Button variant="fill" @click="isOpen = false">
                Close
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
