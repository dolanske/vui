<script setup lang='ts'>
import { useEventListener } from '@vueuse/core'
import { computed, provide, shallowReactive } from 'vue'
import { hasModifier, isTypingTarget, matchesShortcut, parseShortcut } from '../../lib/keys'
import { KBD_GROUP_KEY } from './kbd'
import './kbd.scss'

/**
 * Can be used to wrap multiple <Kbd /> elements and triggers the callback when
 * all of them are active
 */

const { allowInInputs = false } = defineProps<{
  /**
   * Fire `trigger` even while the user is typing in a text field
   */
  allowInInputs?: boolean
}>()

const emits = defineEmits<{
  trigger: []
}>()

// Getters for the `keys` of every child Kbd, in registration order
const registered = shallowReactive<Array<() => string | undefined>>([])

provide(KBD_GROUP_KEY, {
  register(getKeys) {
    registered.push(getKeys)
    return () => {
      const index = registered.indexOf(getKeys)
      if (index !== -1)
        registered.splice(index, 1)
    }
  },
})

// Children being added, removed or changing their keys are respected
const combination = computed(() => {
  const combo = registered
    .map(getKeys => getKeys())
    .filter(Boolean)
    .join('+')
  return combo ? parseShortcut(combo) : null
})

useEventListener(() => combination.value ? document : null, 'keydown', (event: KeyboardEvent) => {
  const shortcut = combination.value
  if (!shortcut || event.repeat)
    return

  if (!allowInInputs && !hasModifier(shortcut) && isTypingTarget(event.target))
    return

  if (matchesShortcut(event, shortcut))
    emits('trigger')
})
</script>

<template>
  <span class="vui-kbd-group">
    <slot />
  </span>
</template>
