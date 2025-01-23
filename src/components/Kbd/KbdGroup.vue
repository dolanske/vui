<script setup lang='ts'>
import type Kbd from './Kbd.vue'
import { useMagicKeys, whenever } from '@vueuse/core'

/**
 * Can be used to wrap multiple <Kbd /> elements and triggers the callback when
 * all of them are active
 */

const emits = defineEmits<{
  trigger: []
}>()

const slots = defineSlots<{
  default: () => Array<typeof Kbd>
}>()
const keys = useMagicKeys()

whenever(
  keys[slots.default().map(vnode => vnode.props.keys).join('+')],
  () => emits('trigger'),
)
</script>

<template>
  <slot />
</template>
