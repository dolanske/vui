<script setup lang="ts">
import { Flex, Switch } from '@dolanske/vui'
import { ref } from 'vue'

const enabled = ref(false)
const disabledSwitch = ref(false)
const notificationSwitch = ref(false)
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex gap="l" x-center>
        <Switch v-model="enabled" label="Enable feature" />
        <Switch v-model="disabledSwitch" label="Disabled switch" disabled />
        <Switch v-model="notificationSwitch" accent>
          <Flex x-center gap="s" y-start>
            <Icon name="ph:bell" style="min-width: 16px; min-height: 16px;" />
            <p class="block">
              Enable notifications
            </p>
          </Flex>
        </Switch>
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
