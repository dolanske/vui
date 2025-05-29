<script setup lang="ts">
import { Button, Modal } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(false)
const isLargeOpen = ref(false)
const isCenteredOpen = ref(false)
const isScrollableOpen = ref(false)
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-md">
        <!-- Basic modal -->
        <Button @click="isOpen = true">
          Open Basic Modal
        </Button>
        <Modal v-model:open="isOpen" title="Basic Modal">
          <p>This is a basic modal with default settings.</p>
        </Modal>

        <!-- Large modal -->
        <Button @click="isLargeOpen = true">
          Open Large Modal
        </Button>
        <Modal v-model:open="isLargeOpen" size="l" title="Large Modal">
          <p>This is a large modal with custom size.</p>
        </Modal>

        <!-- Centered modal with custom header -->
        <Button @click="isCenteredOpen = true">
          Open Centered Modal
        </Button>
        <Modal v-model:open="isCenteredOpen" centered>
          <template #header>
            <h2>Custom Header</h2>
          </template>
          <p>This modal is centered and has a custom header.</p>
        </Modal>

        <!-- Scrollable modal -->
        <Button @click="isScrollableOpen = true">
          Open Scrollable Modal
        </Button>
        <Modal v-model:open="isScrollableOpen" scrollable title="Scrollable Content">
          <p v-for="i in 20" :key="i">
            This is a scrollable modal with lots of content.
          </p>
        </Modal>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
