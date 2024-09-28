<script setup lang="ts">
import { Teleport, Transition } from 'vue'
import { toasts } from './toast'
// TODO: the idea is that toast should be automatically available (or rendered on demand)
// Using a composable
// const toast = useToast()
// toast.add("stuff")
</script>

<template>
  <Teleport to="body">
    <!-- <Transition> -->
    <div>TODO</div>
    <pre>{{ toasts }}</pre>
    <!-- </Transition> -->
  </Teleport>
</template>
