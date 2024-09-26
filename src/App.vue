<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/Button/Button.vue'
import Input from './components/Input/Input.vue'

const val = ref('Holla')
const loading = ref(false)
</script>

<template>
  <div>
    <Input v-model="val" placeholder="Your name bro" />
    <br>
    <Button :disabled="val.length === 0" :loading @click="loading = !loading" variant="danger">
      Submit
    </Button>
  </div>
</template>
