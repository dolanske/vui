<script setup lang="ts">
import { useAttrs, useId } from 'vue'
import { splitAttrs } from '../../lib/input.ts'
import './switch.scss'

interface Props {
  label?: string
  disabled?: boolean
  accent?: boolean
  reversed?: boolean
  hint?: string
  name?: string
}

defineOptions({
  inheritAttrs: false,
})

const { label, disabled, accent, reversed, hint, name } = defineProps<Props>()
const slots = defineSlots()
const checked = defineModel<boolean>()
const attrs = useAttrs()
const id = useId()
const hintId = `${id}-hint`
</script>

<template>
  <div
    class="vui-switch"
    :class="[splitAttrs(attrs).root.class, { disabled, checked, accent, reversed }]"
    :style="splitAttrs(attrs).root.style as any"
  >
    <!-- role="switch" makes assistive technology announce on / off instead of checked -->
    <input
      v-bind="splitAttrs(attrs).control"
      :id
      v-model="checked"
      type="checkbox"
      role="switch"
      :name
      :disabled
      :aria-describedby="hint ? hintId : undefined"
    >
    <label :for="id">
      <span class="vui-switch-icon">
        <span class="vui-switch-indicator" />
      </span>

      <span class="w-100">
        <span v-if="!slots.default && label" class="vui-switch-content is-text">{{ label }}</span>
        <span v-else class="vui-switch-content">
          <slot />
        </span>

        <span v-if="hint" :id="hintId" class="vui-hint mt-xxs block">{{ hint }}</span>
      </span>
    </label>
  </div>
</template>
