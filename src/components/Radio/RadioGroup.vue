<script setup lang='ts'>
import type { FlexProps } from '../Flex/Flex.vue'
import { enforceSlotType, useFlattenedSlot } from '../../shared/slots'
import Flex from '../Flex/Flex.vue'

interface Props extends FlexProps {
  disabled?: boolean
}

const {
  disabled,
  ...flexProps
} = defineProps<Props>()

const slots = defineSlots()

const checked = defineModel()

const flattened = useFlattenedSlot(slots.default)
enforceSlotType(flattened, 'Radio')
</script>

<template>
  <fieldset>
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
  </fieldset>
</template>
