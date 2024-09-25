<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/Button/Button.vue'
import Input from './components/Input/Input.vue'
import Spinner from './components/Spinner/Spinner.vue'

const val = ref('Holla')
const loading = ref(false)
</script>

<template>
  <div>
    <Input v-model="val" label="Name" />
    <Button :loading disabled @click="loading = !loading">
      Submit
    </Button>
    <br><br>
  </div>
</template>
