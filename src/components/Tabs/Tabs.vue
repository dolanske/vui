<script setup lang="ts">
import type { TabProps } from './Tab.vue'
import { useResizeObserver } from '@vueuse/core'
import { onMounted, useTemplateRef, watch } from 'vue'
import { enforceSlotType, useFlattenedSlot } from '../../shared/slots'
import './tabs.scss'

interface Props {
  variant?: 'default' | 'filled'
  expand?: boolean
  disabled?: boolean
}

const {
  expand,
  disabled,
  variant = 'default',
} = defineProps<Props>()

const slots = defineSlots()

const active = defineModel()

// Underline calculation
const underlineRef = useTemplateRef('underline')
const tabsRef = useTemplateRef('tabs')

function computeUnderlinePosition() {
  if (!window)
    return

  if (tabsRef.value && underlineRef.value) {
    const activeBounds = tabsRef.value.querySelector('.vui-tab.active')?.getBoundingClientRect()
    const parentBounds = tabsRef.value.getBoundingClientRect()
    if (!activeBounds || !parentBounds)
      return

    underlineRef.value.style.width = `${activeBounds.width}px`
    underlineRef.value.style.left = `${activeBounds.left - parentBounds.left}px`
  }
}

onMounted(() => {
  useResizeObserver(tabsRef, computeUnderlinePosition)

  watch(
    [active, () => expand],
    computeUnderlinePosition,
    {
      immediate: true,
      flush: 'post',
    },
  )
})

const flattened = useFlattenedSlot<TabProps>(slots.default)

enforceSlotType(flattened, 'Tab')
</script>

<template>
  <div
    ref="tabs"
    class="vui-tabs"
    role="tablist"
    :class="[
      { expand, disabled },
      variant === 'default'
        ? ''
        : `vui-tabs-variant-${variant}`,
    ]"
  >
    <slot name="start" />
    <template v-for="vnode of flattened" :key="vnode.props.value">
      <Component
        :is="vnode"
        :class="{ active: vnode.props.value === active }"
        @click="active = vnode.props.value"
      />
    </template>
    <template v-if="$slots.end">
      <div v-if="!!!expand" class="flex-1" />
      <slot name="end" />
    </template>

    <Transition name="fade" appear>
      <div ref="underline" class="vui-tab-underline" />
    </Transition>
  </div>
</template>
