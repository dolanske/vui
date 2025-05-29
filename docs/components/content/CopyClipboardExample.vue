<script setup lang="ts">
import { Button, CopyClipboard, Input } from '@dolanske/vui'
import { ref } from 'vue'

const textToCopy = ref('Hello, World!')
const customText = ref('')
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-md">
        <!-- Basic usage -->
        <div>
          <h3 class="mb-sm">
            Basic Usage
          </h3>
          <CopyClipboard :text="textToCopy" confirm>
            <Button>
              Copy Text
            </Button>
          </CopyClipboard>
        </div>

        <!-- Custom confirmation message -->
        <div>
          <h3 class="mb-sm">
            Custom Confirmation Message
          </h3>
          <CopyClipboard :text="textToCopy" confirm="Text copied!">
            <Button>
              Copy Text
            </Button>
          </CopyClipboard>
        </div>

        <!-- Custom confirmation UI -->
        <div>
          <h3 class="mb-sm">
            Custom Confirmation UI
          </h3>
          <CopyClipboard :text="textToCopy" confirm>
            <Button>
              Copy Text
            </Button>
            <template #confirm>
              <div class="p-sm bg-green-500 text-white rounded">
                Successfully copied!
              </div>
            </template>
          </CopyClipboard>
        </div>

        <!-- Different tooltip placement -->
        <div>
          <h3 class="mb-sm">
            Bottom Tooltip
          </h3>
          <CopyClipboard :text="textToCopy" confirm confirm-placement="bottom">
            <Button>
              Copy Text
            </Button>
          </CopyClipboard>
        </div>

        <!-- Custom text input -->
        <div>
          <h3 class="mb-sm">
            Copy Custom Text
          </h3>
          <div class="flex gap-sm">
            <Input v-model="customText" placeholder="Enter text to copy" />
            <CopyClipboard :text="customText" confirm>
              <Button>
                Copy
              </Button>
            </CopyClipboard>
          </div>
        </div>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
