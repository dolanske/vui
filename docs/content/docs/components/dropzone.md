# Dropzone

A file upload component that supports both drag-and-drop and click-to-upload functionality. It provides a visual interface for users to upload files and can be operated with the keyboard like a regular file input.

Dropped and picked files are filtered by `accept` and `multiple`. Files which do not match are reported through the `rejected` event instead of `files`. Selecting the same file twice emits again.

::dropzone-example{sourcePath="Input/Dropzone.vue"}

```vue
<script setup>
import { Dropzone, Flex } from '@dolanske/vui'

function handleFiles(files) {
  // Handle files here
}

function handleRejected(files) {
  // Tell the user which files are not supported
}
</script>

<template>
  <Dropzone expand accept="image/*" multiple @files="handleFiles" @rejected="handleRejected">
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

The Dropzone component accepts the props of the base [Input](/docs/components/input), except for `type`, `modelValue`, `focus`, `limit`, `placeholder`, `clearable`, `step`, `min` and `max`. `accept`, `multiple`, `disabled`, `required` and `name` are applied to the file input. While `disabled`, drops are ignored.

### Events

| Name       | Type       | Description                                                                      |
| ---------- | ---------- | -------------------------------------------------------------------------------- |
| `files`    | `FileList` | Emitted with the accepted files when files are selected or dropped               |
| `rejected` | `File[]`   | Emitted with files that do not match `accept`, or extra files without `multiple` |

### Slots

| Name      | Accepts | Props                   | Description                                  |
| --------- | ------- | ----------------------- | -------------------------------------------- |
| `default` | `any`   | `{ dragging: boolean }` | Content to be displayed inside the drop area |
