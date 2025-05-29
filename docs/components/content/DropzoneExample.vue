<script setup>
import { Dropzone } from '@dolanske/vui'
import { Icon } from '@iconify/vue'

function handleFiles(_files) {
  // Handle files here
}
</script>

<template>
  <div class="space-y-l">
    <div>
      <h3 class="text-m mb-s">
        Basic Usage
      </h3>
      <Dropzone @files="handleFiles" />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Label
      </h3>
      <Dropzone
        label="Upload Files"
        @files="handleFiles"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Custom Content
      </h3>
      <Dropzone @files="handleFiles">
        <template #default="{ dragging }">
          <div class="flex items-center gap-xs">
            <Icon :icon="dragging ? 'ph:target' : 'ph:upload'" />
            <span>{{ dragging ? 'Drop files here' : 'Upload your files' }}</span>
          </div>
        </template>
      </Dropzone>
    </div>

    <div>
      <h3 class="text-m mb-s">
        With File Type Restriction
      </h3>
      <Dropzone
        accept="image/*"
        @files="handleFiles"
      >
        <template #default="{ dragging }">
          <div class="flex items-center gap-xs">
            <Icon :icon="dragging ? 'ph:target' : 'ph:image'" />
            <span>{{ dragging ? 'Drop images here' : 'Upload images' }}</span>
          </div>
        </template>
      </Dropzone>
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Multiple Files
      </h3>
      <Dropzone
        multiple
        @files="handleFiles"
      >
        <template #default="{ dragging }">
          <div class="flex items-center gap-xs">
            <Icon :icon="dragging ? 'ph:target' : 'ph:files'" />
            <span>{{ dragging ? 'Drop files here' : 'Upload multiple files' }}</span>
          </div>
        </template>
      </Dropzone>
    </div>
  </div>
</template>
