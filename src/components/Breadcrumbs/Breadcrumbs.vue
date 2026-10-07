<script setup lang='ts'>
import { IconCaretRight } from '@iconify-prerendered/vue-ph'
import { useMutationObserver } from '@vueuse/core'
import { h, onMounted, provide, ref, useTemplateRef } from 'vue'
import { BREADCRUMBS_KEY } from './breadcrumbs'
import './breadcrumbs.scss'

interface Props {
  separator?: string
  /**
   * Accessible name of the navigation landmark
   */
  label?: string
}

const { separator, label = 'Breadcrumb' } = defineProps<Props>()

const slots = defineSlots<{
  default?: () => any
  separator?: () => any
}>()

const listRef = useTemplateRef('list')
const lastItem = ref<Element | null>(null)

function updateLastItem() {
  lastItem.value = listRef.value?.lastElementChild ?? null
}

onMounted(updateLastItem)
useMutationObserver(listRef, updateLastItem, { childList: true })

provide(BREADCRUMBS_KEY, {
  lastItem,
  renderSeparator: () => {
    if (slots.separator)
      return slots.separator()
    if (separator)
      return separator
    return h(IconCaretRight, { class: 'vui-breadcrumb-custom-separator' })
  },
})
</script>

<template>
  <nav class="vui-breadcrumbs-nav" :aria-label="label">
    <ol ref="list" class="vui-breadcrumbs">
      <slot />
    </ol>
  </nav>
</template>
