<script setup>
import { Counter } from '@dolanske/vui'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="container container-xs">
        <Counter
          v-model="count"
          hint="Choose a number between 0 and 10"
          label="Counter"
          :increment-enabled="count < 10"
          :decrement-enabled="count > 0"
        />
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
