<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/Button/Button.vue'
import Checkbox from './components/Checkbox/Checkbox.vue'

const checked = ref(false)
</script>

<template>
  <div>
    <Button variant="link">
      Hello
    </Button>
    <br>
    <Checkbox v-model="checked">
      I hereby surrender my human rights
    </Checkbox>
  </div>
</template>
