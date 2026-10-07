<script setup lang='ts'>
import { useEventListener } from '@vueuse/core'
import { computed, getCurrentInstance, inject, onUnmounted, ref } from 'vue'
import { formatKey, hasModifier, isMacPlatform, isTypingTarget, matchesShortcut, parseShortcut } from '../../lib/keys'
import { KBD_GROUP_KEY } from './kbd'
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
  /**
   * Fire `trigger` even while the user is typing in a text field. By default
   * only shortcuts with Ctrl, Meta or Alt fire there.
   */
  allowInInputs?: boolean
}

const props = defineProps<Props>()
const emits = defineEmits<{
  trigger: []
}>()

// Let a parent KbdGroup know which keys this Kbd represents
const group = inject(KBD_GROUP_KEY, null)
if (group)
  onUnmounted(group.register(() => props.keys))

const parsed = computed(() => props.keys ? parseShortcut(props.keys) : null)

// Listeners are only attached when something actually uses them
const instance = getCurrentInstance()
const listensToTrigger = computed(() => !!instance?.vnode.props?.onTrigger)

useEventListener(() => (listensToTrigger.value && parsed.value) ? document : null, 'keydown', (event: KeyboardEvent) => {
  const shortcut = parsed.value
  if (!shortcut || event.repeat)
    return

  if (!props.allowInInputs && !hasModifier(shortcut) && isTypingTarget(event.target))
    return

  if (matchesShortcut(event, shortcut))
    emits('trigger')
})

//
// Highlight while the combination is held down

const pressed = ref(new Set<string>())

function normalize(key: string): string {
  const lower = key.toLowerCase()
  if (lower === 'control')
    return 'ctrl'
  if (lower === 'os')
    return 'meta'
  return lower
}

const highlightTarget = () => (props.highlight && parsed.value) ? document : null

useEventListener(highlightTarget, 'keydown', (event: KeyboardEvent) => {
  pressed.value = new Set(pressed.value).add(normalize(event.key))
})

useEventListener(highlightTarget, 'keyup', (event: KeyboardEvent) => {
  const next = new Set(pressed.value)
  next.delete(normalize(event.key))
  // Releasing Meta on macOS swallows the keyup of other keys, reset everything
  if (normalize(event.key) === 'meta')
    next.clear()
  pressed.value = next
})

// Keys released while the window was not focused would otherwise stay "held"
useEventListener(() => (props.highlight ? window : null), 'blur', () => {
  pressed.value = new Set()
})

const isActive = computed(() => {
  const shortcut = parsed.value
  if (!props.highlight || !shortcut)
    return false

  const required = [
    ...(shortcut.ctrl ? ['ctrl'] : []),
    ...(shortcut.meta ? ['meta'] : []),
    ...(shortcut.alt ? ['alt'] : []),
    ...(shortcut.shift ? ['shift'] : []),
    ...(shortcut.key ? [shortcut.key] : []),
  ]

  return required.length > 0 && required.every(key => pressed.value.has(key))
})

// macOS shows modifier symbols without separators (⌘K), elsewhere "Ctrl + K"
const formatted = computed(() => {
  if (!props.keys)
    return ''
  const mac = isMacPlatform()
  const parts = props.keys.split('+').map(part => formatKey(part.trim(), mac))
  return parts.join(mac ? '' : ' + ')
})
</script>

<template>
  <kbd class="vui-kbd" :class="{ active: isActive }">
    <slot>
      {{ props.label ?? formatted }}
    </slot>
  </kbd>
</template>
