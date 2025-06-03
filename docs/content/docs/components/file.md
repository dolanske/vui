# File

A specialized input component for handling file uploads. It extends the base Input component with file-specific functionality.

::file-example

```vue
<script setup>
import { File } from '@dolanske/vui'
import { ref } from 'vue'

const files = ref(null)
</script>

<template>
  <File
    v-model="files"
    hint="Upload your files here"
    label="File upload"
    accept=".pdf,.doc,.docx"
    multiple
  />
</template>
```

::

### Usage

The File component inherits all functionality from the base [Input](/docs/components/input) component.

### Events

| Event | Type       | Description                                                    |
| ----- | ---------- | -------------------------------------------------------------- |
| files | `FileList` | Emitted when files are selected, providing the FileList object |
