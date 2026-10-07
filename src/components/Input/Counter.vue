<script setup lang='ts'>
import type { InputProps } from './Input.vue'
import { IconMinus, IconPlus } from '@iconify-prerendered/vue-ph'
import { computed } from 'vue'
import { clamp } from '../../lib/helpers'
import Button from '../Button/Button.vue'
import ButtonGroup from '../Button/ButtonGroup.vue'
import Input from './Input.vue'

type Props = Omit<InputProps, 'type' | 'modelValue'> & {
  incrementBy?: number
  incrementEnabled?: boolean
  hideIncrement?: boolean
  decrementBy?: number
  decrementEnabled?: boolean
  hideDecrement?: boolean
}

const {
  incrementBy = 1,
  incrementEnabled = true,
  hideIncrement = false,
  decrementBy = 1,
  decrementEnabled = true,
  hideDecrement = false,
  ...inputProps
} = defineProps<Props>()

/**
 * `null` represents an empty field
 */
const count = defineModel<number | null>({
  default: 0,
})

const min = computed(() => inputProps.min ?? Number.NEGATIVE_INFINITY)
const max = computed(() => inputProps.max ?? Number.POSITIVE_INFINITY)
const isLocked = computed(() => !!inputProps.disabled || !!inputProps.readonly)

function countDecimals(value: number): number {
  if (!Number.isFinite(value))
    return 0
  const [, decimals = ''] = value.toString().split('.')
  return decimals.length
}

// Adds two numbers without floating point drift (0.1 + 0.2 === 0.3)
function preciseAdd(a: number, b: number): number {
  const decimals = Math.max(countDecimals(a), countDecimals(b))
  return Number((a + b).toFixed(decimals))
}

// Value used as the base for stepping when the field is empty
const current = computed(() => {
  if (typeof count.value === 'number' && Number.isFinite(count.value))
    return count.value
  return Number.isFinite(min.value) && min.value > 0 ? min.value : 0
})

const canDecrement = computed(() => decrementEnabled && !isLocked.value && current.value > min.value)
const canIncrement = computed(() => incrementEnabled && !isLocked.value && current.value < max.value)

function step(amount: number) {
  count.value = clamp(min.value, max.value, preciseAdd(current.value, amount))
}

// Input emits strings, convert them to numbers or `null` when empty
function onType(value: string | number) {
  if (value === '' || value === null || value === undefined) {
    count.value = null
    return
  }

  const parsed = typeof value === 'number' ? value : Number(value)
  if (Number.isFinite(parsed))
    count.value = parsed
}

// Typed values are only clamped once the user leaves the field, so that
// typing e.g. "1" on the way to "15" with min=10 is not interrupted
function onChange(event: Event) {
  // Read the field directly, the model may not have been updated by the parent yet
  const raw = (event.target as HTMLInputElement).value
  if (raw === '')
    return

  const parsed = Number(raw)
  if (Number.isFinite(parsed))
    count.value = clamp(min.value, max.value, parsed)
}
</script>

<template>
  <Input
    v-bind="inputProps"
    :model-value="count ?? ''"
    type="number"
    @update:model-value="onType"
    @change="onChange"
  >
    <template #end>
      <ButtonGroup :gap="2">
        <Button
          v-if="!hideDecrement"
          key="decrease"
          square
          size="s"
          :disabled="!canDecrement"
          :aria-label="`Decrease by ${decrementBy}`"
          @click="step(-decrementBy)"
        >
          <IconMinus /> {{ decrementBy > 1 ? decrementBy : '' }}
        </Button>
        <Button
          v-if="!hideIncrement"
          key="increase"
          square
          size="s"
          :disabled="!canIncrement"
          :aria-label="`Increase by ${incrementBy}`"
          @click="step(incrementBy)"
        >
          <IconPlus /> {{ incrementBy > 1 ? incrementBy : '' }}
        </Button>
      </ButtonGroup>
    </template>
  </Input>
</template>

<style scoped lang="scss">
:deep(.vui-button) {
  padding-inline: 2px !important;
}

:deep(input) {
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
