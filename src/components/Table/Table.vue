<script setup lang='ts'>
import type { TableDataDefinition } from './table'
import { paginate } from '../../shared/helpers'

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
