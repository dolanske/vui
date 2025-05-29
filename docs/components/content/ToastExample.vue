<script setup lang="ts">
import { Button, pushToast } from '@dolanske/vui'
import { defineComponent } from 'vue'

const CustomBody = defineComponent({
  props: {
    data: Object,
    toastId: Number,
  },
  template: `
    <div class="custom-toast-body">
      <p>Custom content for toast {{ toastId }}</p>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  `,
})

function showBasicToast() {
  pushToast('Operation successful')
}

function showActionToast() {
  pushToast('File deleted', {
    description: 'The file has been moved to trash',
    action: {
      label: 'Undo',
      handler: (_toastId) => {
        // Handle undo action
      },
    },
  })
}

function showPersistentToast() {
  pushToast('Important message', {
    persist: true,
    description: 'This toast will stay until manually dismissed',
  })
}

function showCustomToast() {
  pushToast('Custom Toast', {
    body: CustomBody,
    bodyProps: {
      customData: 'This is custom data',
    },
  })
}
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-md">
        <!-- Basic toast -->
        <div>
          <h3 class="mb-sm">
            Basic Toast
          </h3>
          <Button @click="showBasicToast">
            Show Basic Toast
          </Button>
        </div>

        <!-- Toast with description and action -->
        <div>
          <h3 class="mb-sm">
            Toast with Description and Action
          </h3>
          <Button @click="showActionToast">
            Show Action Toast
          </Button>
        </div>

        <!-- Persistent toast -->
        <div>
          <h3 class="mb-sm">
            Persistent Toast
          </h3>
          <Button @click="showPersistentToast">
            Show Persistent Toast
          </Button>
        </div>

        <!-- Custom body toast -->
        <div>
          <h3 class="mb-sm">
            Custom Body Toast
          </h3>
          <Button @click="showCustomToast">
            Show Custom Toast
          </Button>
        </div>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
