# File

A specialized input component for handling file uploads. It extends the base Input component with file-specific functionality.

::file-example{sourcePath="Input/File.vue"}

```vue
<script setup>
import { File } from '@dolanske/vui'
import { ref } from 'vue'

const files = ref(null)
</script>

<template>
  <File
    hint="Upload your files here"
    label="File upload"
    accept=".pdf,.doc,.docx"
    name="documents"
    multiple
    @files="files = $event"
  />
</template>
```

::

### Usage

The File component accepts the props of the base [Input](/docs/components/input) component, except `type`. It has no `v-model`, selected files are delivered through the `files` event. Attributes such as `name` or `capture` are applied to the native file input.

### Events

| Event   | Type       | Description                                                    |
| ------- | ---------- | -------------------------------------------------------------- |
| `files` | `FileList` | Emitted when files are selected, providing the FileList object |
