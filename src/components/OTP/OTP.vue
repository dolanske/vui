<script setup lang='ts'>
import { computed, provide, watch } from 'vue'
import './otp.scss'

interface Props {
  mode?: 'num' | 'char' | 'both'
}

const {
  mode = 'both',
} = defineProps<Props>()

const emits = defineEmits<{
  change: [value?: string]
  complete: [value: string]
}>()

const regexNumbers = '^\\d+$'
const regexChars = '^[a-zA-Z]+$'
const regexBoth = '^[a-zA-Z0-9]+$'

const pattern = computed(() => {
  if (mode === 'num')
    return regexNumbers
  else if (mode === 'char')
    return regexChars
  else return regexBoth
})

const value = defineModel<string>()

provide('otp-value', value)

watch(value, value => emits('change', value))
</script>

<template>
  <div class="vui-otp">
    <slot />

    <input v-model-value :pattern type="text" class="vui-input-hidden">
  </div>
</template>
