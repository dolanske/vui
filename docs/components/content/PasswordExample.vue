<script setup>
import { Password } from '@dolanske/vui'
import { ref } from 'vue'

const password = ref('')
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="container container-xs">
        <Password
          v-model="password"
          expand
          placeholder="******************"
          label="Password"
        />
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
