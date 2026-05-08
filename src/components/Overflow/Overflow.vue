<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { computed, useTemplateRef } from 'vue'
import './overflow.scss'

interface Props {
  /**
   * Use vertical scrolling instead of horizontal
   */
  vertical?: boolean
  /**
   * Hides the scrollbar and removes the scrollbar gutter padding
   */
  hideScrollbar?: boolean
  /**
   * Hides shadows indicating scrolling context
   */
  hideShadows?: boolean
}

const {
  vertical,
  hideScrollbar,
  hideShadows,
} = defineProps<Props>()

const contentRef = useTemplateRef<HTMLElement>('content')

const { x, y } = useScroll(contentRef)

const showShadowLeft = computed(() => !vertical && x.value > 0)
const showShadowRight = computed(() => {
  if (vertical || !contentRef.value)
    return false
  return x.value < contentRef.value.scrollWidth - contentRef.value.clientWidth
})
const showShadowTop = computed(() => vertical && y.value > 0)
const showShadowBottom = computed(() => {
  if (!vertical || !contentRef.value)
    return false
  return y.value < contentRef.value.scrollHeight - contentRef.value.clientHeight
})
</script>

<template>
  <div
    class="overflow"
    :class="{
      'hide-scrollbar': hideScrollbar,
      'hide-shadows': hideShadows,
      'is-horizontal': !vertical,
      'is-vertical': vertical,
    }"
  >
    <div class="overflow-track">
      <div class="overflow-shadow overflow-shadow-left" :class="{ visible: showShadowLeft }" />
      <div class="overflow-shadow overflow-shadow-right" :class="{ visible: showShadowRight }" />
      <div class="overflow-shadow overflow-shadow-top" :class="{ visible: showShadowTop }" />
      <div class="overflow-shadow overflow-shadow-bottom" :class="{ visible: showShadowBottom }" />
      <div ref="content" class="overflow-content">
        <slot />
      </div>
    </div>
  </div>
</template>
