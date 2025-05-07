<script setup lang='ts'>
import { useMagicKeys, whenever } from '@vueuse/core'
import { useSlots } from 'vue'
import { enforceSlotType, useFlattenedSlot } from '../../shared/slots'

/**
 * Can be used to wrap multiple <Kbd /> elements and triggers the callback when
 * all of them are active
 */

const emits = defineEmits<{
  trigger: []
}>()

// const slots = defineSlots<{
//   default: () => Array<typeof Kbd>
// }>()
const keys = useMagicKeys()

const slots = useSlots()
const flattened = useFlattenedSlot(slots.default)
enforceSlotType(flattened, 'Kbd')

whenever(
  keys[flattened.value.map(vnode => vnode.props.keys).join('+')],
  () => emits('trigger'),
)
</script>

<template>
  <slot />
</template>
