<script setup>
import { Dropzone, Flex } from '@dolanske/vui'

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
              <Icon :name="dragging ? 'ph:target' : 'ph:upload'" />
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
