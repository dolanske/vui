<script setup lang="ts">
import type { TabProps } from './Tab.vue'
import { onMounted, useTemplateRef, type VNode, watch } from 'vue'
import './tabs.scss'

interface Props {
  expand?: boolean
  disabled?: boolean
}

const { expand, disabled } = defineProps<Props>()

const slots = defineSlots<{
  default: () => Array<VNode & { props: TabProps }>
}>()

const active = defineModel()

// Underline calculation
const underline = useTemplateRef('underline')
const tabs = useTemplateRef('tabs')

onMounted(() => {
  watch([active, expand], () => {
    if (tabs.value && underline.value) {
      const activeBounds = tabs.value.querySelector('.vui-tab.active')?.getBoundingClientRect()
      const parentBounds = tabs.value.getBoundingClientRect()
      if (!activeBounds || !parentBounds)
        return

      underline.value.style.width = `${activeBounds.width}px`
      underline.value.style.left = `${activeBounds.left - parentBounds.left}px`
    }
  }, {
    immediate: true,
    flush: 'post',
  })
})
</script>

<template>
  <div ref="tabs" class="vui-tabs" :class="{ expand, disabled }">
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
