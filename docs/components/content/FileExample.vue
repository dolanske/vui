<script setup>
import { File } from '@dolanske/vui'
import { ref } from 'vue'

const files = ref(null)
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="container container-xs">
        <File
          v-model="files"
          hint="Upload your files here"
          label="File upload"
          accept=".pdf,.doc,.docx"
          multiple
        />
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
