<script setup lang='ts'>
import type { InputProps } from './Input.vue'
import { Icon } from '@iconify/vue'
import Button from '../Button/Button.vue'
import ButtonGroup from '../ButtonGroup/ButtonGroup.vue'
import Input from './Input.vue'

type Props = Omit<InputProps, 'type'> & {
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

const count = defineModel<number>({
  default: 0,
})
</script>

<template>
  <Input v-bind="inputProps" v-model.number="count" type="number">
    <template #end>
      <ButtonGroup>
        <Button v-if="!hideDecrement" key="decrease" :disabled="!decrementEnabled" :style="{ 'border-top-left-radius': 0, 'border-bottom-left-radius': 0, 'marginRight': '-1px' }" @click="count -= decrementBy">
          <Icon icon="ph:minus" /> {{ decrementBy > 1 ? decrementBy : '' }}
        </Button>
        <Button v-if="!hideIncrement" key="increase" :disabled="!incrementEnabled" @click="count += incrementBy">
          <Icon icon="ph:plus" /> {{ incrementBy > 1 ? incrementBy : '' }}
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
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
