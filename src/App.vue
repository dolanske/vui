<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/Button/Button.vue'
import Flex from './components/Flex/Flex.vue'
import Grid from './components/Grid/Grid.vue'
import Input from './components/Input/Input.vue'

const val = ref('Holla')
// const loading = ref(false)
</script>

<template>
  <div>
    <Input v-model="val" placeholder="Your name bro" />
    <br>
    <Flex>
      <Button>
        Normal
      </Button>
      <Button variant="danger">
        Danger
      </Button>
      <Button variant="success">
        Success
      </Button>
    </Flex>

    <Grid :areas="['A A A', 'A B B']">
      <h1>A</h1>
      <h1>B</h1>
      <h1>C</h1>
      <h2>D</h2>
    </Grid>
  </div>
</template>
