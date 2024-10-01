<script setup lang='ts'>
import type { FlexProps } from '../Flex/Flex.vue'
import type { RadioProps } from './Radio.vue'
import { useId, type VNode } from 'vue'
import Flex from '../Flex/Flex.vue'

interface Props extends FlexProps {
  disabled?: boolean
}

const {
  disabled,
  ...flexProps
} = defineProps<Props>()

const slots = defineSlots<{
  default: () => { children: Array<VNode & { props: RadioProps }> }[]
}>()

const checked = defineModel()
</script>

<template>
  <Flex v-bind="flexProps">
    <Component
      :is="vnode"
      v-for="vnode of slots.default()[0].children"
      :key="vnode.props.value"
      v-bind="vnode.props"
      v-model="checked"
      :class="{ disabled: disabled || vnode.props.disabled }"
    />
  </Flex>
  <!-- <div class="vui-radio-group" /> -->
</template>
