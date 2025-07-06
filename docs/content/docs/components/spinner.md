# Spinner

The Spinner component is a loading indicator that shows an animated circular progress. It's commonly used to indicate that a process is ongoing or that content is being loaded.

::spinner-example

```vue
<script setup>
import { Flex, Spinner } from '@dolanske/vui'
</script>

<template>
  <Flex x-center y-center gap="l">
    <Spinner size="s" />
    <Spinner size="m" />
    <Spinner size="l" />
  </Flex>
</template>
```

::

## Props

| Name   | Default | Type                                     |
| ------ | ------- | ---------------------------------------- |
| `size` | `m`     | `s` `m` `l` <br> The size of the spinner |
