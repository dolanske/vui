<script setup lang="ts">
import { useId } from 'vue'
import './switch.scss'

interface Props {
  label?: string
  disabled?: boolean
  accent?: boolean
  reversed?: boolean
  hint?: string
}

const { label, disabled, accent, reversed, hint } = defineProps<Props>()
const slots = defineSlots()
const checked = defineModel<boolean>()
const id = useId()
</script>

<template>
  <div class="vui-switch" :class="{ disabled, checked, accent, reversed }">
    <input :id v-model="checked" type="checkbox" :disabled>
    <label :for="id">
      <div class="vui-switch-icon">
        <span class="vui-switch-indicator" />
      </div>

      <div class="w-100">
        <p v-if="!slots.default && label" class="vui-switch-content">{{ label }}</p>
        <div v-else class="vui-switch-content">
          <slot />
        </div>

        <p v-if="hint" class="vui-hint mt-xxs block">{{ hint }}</p>
      </div>

    </label>
  </div>
</template>
