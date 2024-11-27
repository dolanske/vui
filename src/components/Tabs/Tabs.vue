<script setup lang="ts">
import type { TabProps } from './Tab.vue'
import { useEventListener } from '@vueuse/core'
import { onMounted, useTemplateRef, type VNode, watch } from 'vue'
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
  useEventListener(window, 'resize', computeUnderlinePosition)

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
    <Component
      :is="vnode"
      v-for="vnode of slots.default()"
      :key="vnode.props.id"
      :class="{ active: vnode.props.id === active }"
      @click="active = vnode.props.id"
    />

    <div ref="underline" class="vui-tab-underline" />
  </div>
</template>
