<script setup lang='ts'>
import type { TableDataDefinition } from './table'

interface Props {
  // Pagination settings
  data: TableDataDefinition

  // search?: string

  // Used to add checkboxs to each row
  select?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <table />
</template>
