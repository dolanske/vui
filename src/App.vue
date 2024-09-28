<script setup lang="ts">
import { ref } from 'vue'
import Checkbox from './components/Checkbox/Checkbox.vue'

const checked = ref(false)
</script>

<template>
  <div>
    <Checkbox v-model="checked">
      I hereby surrender my human rights
    </Checkbox>
  </div>
</template>
