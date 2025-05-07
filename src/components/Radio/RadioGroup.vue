<script setup lang='ts'>
import type { FlexProps } from '../Flex/Flex.vue'
import type Radio from './Radio.vue'
import { useSlots, watchEffect } from 'vue'
import Flex from '../Flex/Flex.vue'
import { enforceSlotType, useFlattenedSlot } from '../../shared/slots'

interface Props extends FlexProps {
  disabled?: boolean
}

const {
  disabled,
  ...flexProps
} = defineProps<Props>()

const checked = defineModel()

const slots = useSlots()
const flattened = useFlattenedSlot(slots.default)
enforceSlotType(flattened, "Radio")
</script>

<template>
  <Flex v-bind="flexProps">
    <Component
      :is="vnode"
      v-for="vnode of flattened"
      :key="vnode.props.value"
      v-bind="vnode.props"
      v-model="checked"
      :class="{ disabled: disabled || vnode.props.disabled }"
    />
  </Flex>
</template>
