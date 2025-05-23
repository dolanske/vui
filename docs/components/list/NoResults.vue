<script setup lang="ts">
import { Button } from '@dolanske/vui'

const props = defineProps<{
  search: string
}>()

const emit = defineEmits<{
  (e: 'clear'): void
}>()
</script>

<template>
  <div class="no-results">
    <p>No results found for "<strong>{{ props.search }}</strong>"</p>
    <Button size="s" variant="fill" @click="emit('clear')">
      Clear
    </Button>
  </div>
</template>

<style scoped>
.no-results {
  border: 1px solid var(--color-border);
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--space-m);

  strong {
    font-weight: var(--font-weight-semibold);
  }
}
</style>
