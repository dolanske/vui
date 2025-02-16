<script setup lang="ts">
import type { VNode } from 'vue'
import type { TabProps } from './Tab.vue'
import { useResizeObserver } from '@vueuse/core'
import { onMounted, useTemplateRef, watch } from 'vue'
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

const slots = defineSlots<{
  default: () => Array<VNode & { props: TabProps }>
  start: unknown
  end: unknown
}>()

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
    <Component
      :is="vnode"
      v-for="vnode of slots.default()"
      :key="vnode.props.label"
      :class="{ active: vnode.props.label === active }"
      @click="active = vnode.props.label"
    />
    <template v-if="slots.end">
      <div v-if="!!!expand" class="flex-1" />
      <slot name="end" />
    </template>

    <Transition name="fade" appear>
      <div ref="underline" class="vui-tab-underline" />
    </Transition>
  </div>
</template>
