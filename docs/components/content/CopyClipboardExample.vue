<script setup lang="ts">
import { Button, CopyClipboard, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <CopyClipboard text="Hello world!" confirm>
          <Button>
            Copy Text
          </Button>
        </CopyClipboard>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
