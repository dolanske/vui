# Dropzone

A file upload component that supports both drag-and-drop and click-to-upload functionality. It provides a visual interface for users to upload files.

::dropzone-example

### Props

The Dropzone component accepts most props from the base Input component, except for `type`, `modelValue`, `focus`, `limit`, and `placeholder`.

### Events

| Name    | Type       | Description                                |
| ------- | ---------- | ------------------------------------------ |
| `files` | `FileList` | Emitted when files are selected or dropped |

### With Label

```vue
<script setup>
import { Dropzone } from '@dolanske/vui'

function handleFiles(files) {
  console.log('Selected files:', files)
}
</script>

<template>
  <Dropzone
    label="Upload Files"
    @files="handleFiles"
  />
</template>
```

### With Custom Content

```vue
<script setup>
import { Dropzone } from '@dolanske/vui'

function handleFiles(files) {
  console.log('Selected files:', files)
}
</script>

<template>
  <Dropzone @files="handleFiles">
    <template #default="{ dragging }">
      <div class="flex items-center gap-xs">
        <Icon :icon="dragging ? 'ph:target' : 'ph:upload'" />
        <span>{{ dragging ? 'Drop files here' : 'Upload your files' }}</span>
      </div>
    </template>
  </Dropzone>
</template>
```

### With File Type Restriction

```vue
<script setup>
import { Dropzone } from '@dolanske/vui'

function handleFiles(files) {
  console.log('Selected files:', files)
}
</script>

<template>
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
</template>
```

### With Multiple Files

```vue
<script setup>
import { Dropzone } from '@dolanske/vui'

function handleFiles(files) {
  console.log('Selected files:', files)
}
</script>

<template>
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
</template>
```
