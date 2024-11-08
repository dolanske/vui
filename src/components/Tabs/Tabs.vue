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
const underline = useTemplateRef('underline')
const tabs = useTemplateRef('tabs')

function computeUnderlinePosition() {
  if (tabs.value && underline.value) {
    const activeBounds = tabs.value.querySelector('.vui-tab.active')?.getBoundingClientRect()
    const parentBounds = tabs.value.getBoundingClientRect()
    if (!activeBounds || !parentBounds)
      return

    underline.value.style.width = `${activeBounds.width}px`
    underline.value.style.left = `${activeBounds.left - parentBounds.left}px`
  }
}

onMounted(() => {
  watch(
    [active, () => expand],
    computeUnderlinePosition,
    {
      immediate: true,
      flush: 'post',
    },
  )
})

useEventListener(window, 'resize', computeUnderlinePosition)
</script>

<template>
  <div
    ref="tabs"
    class="vui-tabs"
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
