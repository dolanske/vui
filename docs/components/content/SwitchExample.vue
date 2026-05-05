<script setup lang="ts">
import { Flex, Switch } from '@dolanske/vui'
import { ref } from 'vue'

const enabled = ref(false)
const disabledSwitch = ref(false)
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex gap="l" x-center>
        <Switch v-model="enabled" label="Enable feature" />
        <Switch v-model="disabledSwitch" label="Disabled switch" disabled />
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style scoped>
:deep(p) {
  margin: 0;
}
</style>
