<script setup>
import { Dropzone, Flex } from '@dolanske/vui'
import { Icon } from '@iconify/vue'

function handleFiles(_files) {
  // Handle files here
}
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="container container-s">
        <Dropzone expand @files="handleFiles">
          <template #default="{ dragging }">
            <Flex x-center gap="s">
              <Icon :icon="dragging ? 'ph:target' : 'ph:upload'" />
              <span>{{ dragging ? 'Drop files here' : 'Upload your files' }}</span>
            </Flex>
          </template>
        </Dropzone>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
