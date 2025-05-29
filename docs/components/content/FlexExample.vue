<script setup lang="ts">
import { Button, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-md">
        <!-- Basic row -->
        <Flex gap="m" x-center y-center>
          <Button>Item 1</Button>
          <Button>Item 2</Button>
          <Button>Item 3</Button>
        </Flex>

        <!-- Row with space between -->
        <Flex x-between>
          <Button>Left</Button>
          <Button>Right</Button>
        </Flex>

        <!-- Column with center alignment -->
        <Flex column x-center gap="m">
          <Button>Top</Button>
          <Button>Middle</Button>
          <Button>Bottom</Button>
        </Flex>

        <!-- Wrapped row with custom gap -->
        <Flex wrap :gap="16">
          <Button>Item 1</Button>
          <Button>Item 2</Button>
          <Button>Item 3</Button>
          <Button>Item 4</Button>
        </Flex>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
