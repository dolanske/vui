<script setup lang='ts'>
import { useMagicKeys, whenever } from '@vueuse/core'
import { computed, watch } from 'vue'
import './kbd.scss'

interface Props {
  /**
   * Specify the key or the combination of keys connected with "+". Make sure
   * there are no white spaces between letters.
   *
   * keys="Escape" keys="Ctrl+A"
   */
  keys?: string
  /**
   * Display custom label instead of the automatically formatted keys.
   */
  label?: string
  /**
   * Show active state when this combination of keys is pressed.
   */
  highlight?: boolean
}

const props = defineProps<Props>()
const emits = defineEmits<{
  trigger: []
}>()
const keyHandler = useMagicKeys()

// Make sure we listen for the existence of props.keys in case they are not
// available at first
whenever(() => props.keys, (value) => {
  whenever(keyHandler[value], () => {
    emits('trigger')
  })
})


const isActive = computed(() => {
  if (!props.highlight || !props.keys)
    return false

  return props.keys.split('+').every((key) => {
    return keyHandler.current.has(key.toLowerCase())
  })
})
</script>

<template>
  <kbd class="vui-kbd" :class="{ active: isActive }">
    <slot>
      {{ props.label ?? props.keys?.replaceAll("+", " + ") }}
    </slot>
  </kbd>
</template>
