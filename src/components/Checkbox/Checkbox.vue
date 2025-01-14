<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useId } from 'vue'
import './checkbox.scss'

interface Props {
  label?: string
  iconOn?: string
  iconOff?: string
  disabled?: boolean
  checked?: boolean
}

const {
  label,
  iconOn = 'ph:check-square-fill',
  iconOff = 'ph:square',
  disabled,
  checked: checkedProp,
} = defineProps<Props>()
const emit = defineEmits<{
  change: [checked: boolean]
}>()
const slots = defineSlots()
const checked = defineModel<boolean>()
const id = useId()
</script>

<template>
  <div class="vui-checkbox" :class="{ disabled: !!disabled, checked }">
    <input
      :id
      v-model="checked"
      type="checkbox"
      :disabled
      :checked="checkedProp"
      @change="(e) => {
        if (disabled) return
        emit('change', (e.target as HTMLInputElement).checked)
      }"
    >
    <label :for="id">
      <span class="vui-checkbox-icon">
        <Icon :icon="checked ? iconOn : iconOff" />
      </span>
      <p v-if="label || slots.default" class="vui-checkbox-content">
        <slot>{{ label }}</slot>
      </p>
    </label>
  </div>
</template>
