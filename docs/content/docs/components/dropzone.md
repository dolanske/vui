# Dropzone

A file upload component that supports both drag-and-drop and click-to-upload functionality. It provides a visual interface for users to upload files.

::dropzone-example

```vue
<script setup>
import { Dropzone, Flex } from '@dolanske/vui'

function handleFiles(_files) {
  // Handle files here
}
</script>

<template>
  <Dropzone expand @files="handleFiles">
    <template #default="{ dragging }">
      <Flex x-center gap="s">
        <IconTarget v-if="dragging" />
        <IconUpload v-else />
        <span>{{ dragging ? 'Drop files here' : 'Upload your files' }}</span>
      </Flex>
    </template>
  </Dropzone>
</template>
```

::

### Props

The Dropzone component accepts most props from the base [Input](/docs/components/input), except for `type`, `modelValue`, `focus`, `limit`, and `placeholder`.

### Events

| Name    | Type       | Description                                |
| ------- | ---------- | ------------------------------------------ |
| `files` | `FileList` | Emitted when files are selected or dropped |

### Slots

| Name      | Accepts | Description                                  |
| --------- | ------- | -------------------------------------------- |
| `default` | `any`   | Content to be displayed inside the drop area |
