<script setup lang='ts'>
import Grid from '../../components/Grid/Grid.vue'

const props = defineProps<{
  name: string
  color: string
}>()
</script>

<template>
  <Grid columns="212px 32px" y-center>
    <span>{{ props.name }}</span>
    <div
      class="cube" :style="{
        backgroundColor: `var(${props.color})`,
      }"
    />
  </Grid>
</template>

<style scoped>
.cube {
  display: block;
  width: 32px;
  height: 32px;
  border-radius: var(--border-radius-xs);
}
</style>
