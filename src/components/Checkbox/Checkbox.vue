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
  iconOff = 'ph:square-bold',
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
      @change="emit('change', ($event.target as HTMLInputElement).checked)"
    >
    <label :for="id">
      <span class="vui-checkbox-icon">
        <Icon :icon="checked ? iconOn : iconOff" />
      </span>
      <p v-if="label" class="vui-checkbox-content">{{ label }}</p>
      <div v-else-if="slots.default" class="vui-checkbox-content">
        <slot />
      </div>
    </label>
  </div>
</template>
