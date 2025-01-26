<script setup lang="ts">
import './badge.scss'

interface Props {
  variant?: 'neutral' | 'danger' | 'warning' | 'success' | 'info' | 'accent'
  outline?: boolean
  filled?: boolean
}

const {
  variant = 'neutral',
  outline,
  filled,
} = defineProps<Props>()
</script>

<template>
  <div class="vui-badge" :class="[{ outline, filled }, `vui-badge-variant-${variant}`]">
    <slot />
  </div>
</template>
