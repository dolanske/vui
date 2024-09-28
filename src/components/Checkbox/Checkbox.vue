<script setup lang="ts">
import { Icon } from '@iconify/vue'

import { useId, useSlots } from 'vue'
import './checkbox.scss'

interface Props {
  label?: string
  iconOn?: string
  iconOff?: string
  disabled?: boolean

  // TODO: add option to reverse the label & checkbox
  // reverse?: boolean
}
const {
  label,
  iconOn = 'ph:check-square-fill',
  iconOff = 'ph:square-bold',
  disabled,
} = defineProps<Props>()
const slots = defineSlots()
const checked = defineModel<boolean>()
const id = useId()
</script>

<template>
  <div class="vui-checkbox" :class="{ disabled, checked }">
    <input :id v-model="checked" type="checkbox" :disabled>
    <label :for="id">
      <span class="vui-checkbox-icon">
        <Icon :icon="checked ? iconOn : iconOff" />
      </span>
      <p v-if="!slots.default" class="vui-checkbox-content">{{ label }}</p>
      <div v-else class="vui-checkbox-content">
        <slot />
      </div>
    </label>
  </div>
</template>
