<script setup lang='ts'>
import type { FlexProps } from '../Flex/Flex.vue'
import type Radio from './Radio.vue'
import { watchEffect } from 'vue'
import Flex from '../Flex/Flex.vue'

interface Props extends FlexProps {
  disabled?: boolean
}

const {
  disabled,
  ...flexProps
} = defineProps<Props>()

const slots = defineSlots<{
  default: () => Array<typeof Radio>
}>()

const checked = defineModel()

watchEffect(() => {
  if (slots.default().some(s => s.type.__name !== 'Radio')) {
    console.error('You can only pass `<Radio />` components as children.')
  }
})
</script>

<template>
  <Flex v-bind="flexProps">
    <Component
      :is="vnode"
      v-for="vnode of slots.default()"
      :key="vnode.props.value"
      v-bind="vnode.props"
      v-model="checked"
      :class="{ disabled: disabled || vnode.props.disabled }"
    />
  </Flex>
</template>
