<script setup lang="ts">
const slots = defineSlots<{
  default: () => VNode
}>()

watchEffect(() => {
  console.log(slots.default?.())
})

// TODO: add code copy button
</script>

<template>
  <pre>

    <!-- {{ slots.default() }} -->
  </pre>
  <!-- <MDC :value="slots.default?.()" /> -->
</template>
