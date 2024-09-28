<script setup lang="ts">
import { Icon } from '@iconify/vue'

import { useId } from 'vue'
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
} = defineProps<Props>()
const checked = defineModel<boolean>()
const id = useId()
</script>

<template>
  <div class="vui-checkbox" :class="{ disabled, checked }">
    <input :id v-model="checked" type="checkbox" :name="id" :disabled>
    <label :for="id">
      <span class="vui-checkbox-icon">
        <Icon :icon="checked ? iconOn : iconOff" />
      </span>
      <div class="vui-checkbox-content">
        <slot>
          {{ label }}
        </slot>
      </div>
    </label>
  </div>
</template>
