<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import { computed, useId } from 'vue'
import './radio.scss'

export interface RadioProps {
  label?: string
  disabled?: boolean
  value: any
  accent?: boolean
}

const {
  label,
  disabled,
  value,
  accent,
} = defineProps<RadioProps>()
const slots = defineSlots()
const checked = defineModel()
const id = useId()
const isChecked = computed(() => value === checked.value)
</script>

<template>
  <div class="vui-radio" :class="{ disabled: !!disabled, checked: isChecked, accent }">
    <input :id v-model="checked" type="radio" :value :checked="isChecked" :disabled>
    <label :for="id">
      <span class="vui-radio-icon">
        <Icon :icon="isChecked ? 'ph:radio-button-fill' : 'ph:circle'" />
      </span>
      <p v-if="!slots.default" class="vui-radio-content">{{ label || value }}</p>
      <div v-else class="vui-radio-content">
        <slot />
      </div>
    </label>
  </div>
</template>
