<script setup lang="ts">
import type { FlexProps } from '../Flex/Flex.vue'
import { provide, ref, useTemplateRef } from 'vue'
import Flex from '../Flex/Flex.vue'
import { MENUBAR_KEY, MENUBAR_TRIGGER_ATTR } from './menubar'

const props = withDefaults(defineProps<FlexProps>(), {
  gap: 's',
})

const openId = ref<string | null>(null)
const activeId = ref<string | null>(null)
const registered: string[] = []

provide(MENUBAR_KEY, {
  openId,
  activeId,
  register(id) {
    registered.push(id)
    // The first item is the initial Tab stop
    if (activeId.value === null)
      activeId.value = id

    return () => {
      registered.splice(registered.indexOf(id), 1)
      if (activeId.value === id)
        activeId.value = registered[0] ?? null
      if (openId.value === id)
        openId.value = null
    }
  },
  open(id) {
    openId.value = id
    activeId.value = id
  },
  close() {
    openId.value = null
  },
})

const rootRef = useTemplateRef<InstanceType<typeof Flex>>('root')

function getTriggers(): HTMLElement[] {
  const root = rootRef.value?.$el as HTMLElement | undefined
  return root ? Array.from(root.querySelectorAll<HTMLElement>(`[${MENUBAR_TRIGGER_ATTR}]`)) : []
}

/**
 * Moves focus between top level triggers. When a menu is open, the menu of
 * the newly focused trigger opens instead.
 */
function moveFocus(from: HTMLElement, direction: 1 | -1 | 'first' | 'last') {
  const triggers = getTriggers()
  const index = triggers.indexOf(from)
  if (triggers.length === 0)
    return

  const next = direction === 'first'
    ? triggers[0]
    : direction === 'last'
      ? triggers.at(-1)!
      : triggers[(index + direction + triggers.length) % triggers.length]

  const id = next.getAttribute(MENUBAR_TRIGGER_ATTR)!
  activeId.value = id
  if (openId.value !== null)
    openId.value = id
  next.focus()
}

function onKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLElement
  if (!target.hasAttribute(MENUBAR_TRIGGER_ATTR))
    return

  const map: Record<string, 1 | -1 | 'first' | 'last'> = {
    ArrowRight: 1,
    ArrowLeft: -1,
    Home: 'first',
    End: 'last',
  }

  const direction = map[event.key]
  if (direction !== undefined) {
    event.preventDefault()
    moveFocus(target, direction)
  }
}

defineExpose({
  moveFocus,
})
</script>

<template>
  <Flex ref="root" v-bind="props" role="menubar" aria-orientation="horizontal" @keydown="onKeydown">
    <slot />
  </Flex>
</template>
