<script setup lang="ts">
import { Flex, Textarea } from '@dolanske/vui'
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="container container-xs">
        <Flex column gap="m" y-center>
          <Textarea
            v-model="text"
            expand
            label="Description"
            hint="Let me know what you think about vui"
            placeholder="Your text..."
            :limit="280"
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
