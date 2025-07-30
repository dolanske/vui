<script setup lang="ts">
import { IconCheckSquareFill, IconSquare } from '@iconify-prerendered/vue-ph'
import { useId } from 'vue'
import './checkbox.scss'

interface Props {
  label?: string
  disabled?: boolean
  checked?: boolean
  accent?: boolean
}

const {
  label,
  disabled,
  checked: checkedProp,
  accent,
} = defineProps<Props>()
const emit = defineEmits<{
  change: [checked: boolean]
}>()
const slots = defineSlots()
const checked = defineModel<boolean>()
const id = useId()
</script>

<template>
  <div class="vui-checkbox" :class="{ disabled: !!disabled, checked, accent }">
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
        <slot v-if="checked" name="icon-on">
          <IconCheckSquareFill />
        </slot>
        <slot v-else name="icon-off">
          <IconSquare />
        </slot>
      </span>
      <p v-if="label || slots.default" class="vui-checkbox-content">
        <slot>{{ label }}</slot>
      </p>
    </label>
  </div>
</template>
