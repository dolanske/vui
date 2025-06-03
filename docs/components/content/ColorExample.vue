<script setup>
import { Color } from '@dolanske/vui'
import { ref } from 'vue'

const color = ref('#4CAF50')
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="container container-xs">
        <Color
          v-model="color"
          hint="Choose your favorite color please"
          label="Theme color"
        />
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
