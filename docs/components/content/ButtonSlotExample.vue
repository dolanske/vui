<script setup>
import { Button, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Button>
          <template #start>
            <Icon name="ph:plus" />
          </template>
          Add Item
          <template #end>
            <Icon name="ph:caret-down" />
          </template>
        </Button>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
