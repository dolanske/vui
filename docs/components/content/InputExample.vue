<script setup lang="ts">
import { Flex, Input } from '@dolanske/vui'
import { ref } from 'vue'

// const username = ref('')
const email = ref('')
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="container container-xs">
        <Flex column gap="m" y-center>
          <Input
            v-model="email"
            expand
            label="Email"
            placeholder="example@email.com"
            :limit="32"
            required
          />
        </Flex>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style scoped>
:deep(ul) {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 0;
  }

  li:before {
    display: none;
  }
}
</style>
