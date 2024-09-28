<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/Button/Button.vue'
import Flex from './components/Flex/Flex.vue'
import Input from './components/Input/Input.vue'

const val = ref('Holla')
// const loading = ref(false)
</script>

<template>
  <div>
    <Input v-model="val" placeholder="Your name bro" />
    <br>
    <Flex column align-center>
      <Button disabled>
        Normal
      </Button>
      <Button variant="danger" disabled>
        Danger
      </Button>
      <Button variant="success" disabled>
        Success
      </Button>
    </Flex>
  </div>
</template>
