<script setup lang="ts">
import { useId } from 'vue'
import './switch.scss'

interface Props {
  label?: string
  disabled?: boolean
  accent?: boolean
}

const { label, disabled, accent } = defineProps<Props>()
const slots = defineSlots()
const checked = defineModel<boolean>()
const id = useId()
</script>

<template>
  <div class="vui-switch" :class="{ disabled, checked, accent }">
    <input :id v-model="checked" type="checkbox" :disabled>
    <label :for="id">
      <div class="vui-switch-icon">
        <span class="vui-switch-indicator" />
      </div>

      <p v-if="!slots.default" class="vui-switch-content">{{ label }}</p>
      <div v-else class="vui-switch-content">
        <slot />
      </div>
    </label>
  </div>
</template>
