<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { computed, useTemplateRef } from 'vue'
import './overflow.scss'

interface Props {
  /**
   * Use horizontal scrolling instead of vertical
   */
  horizontal?: boolean
  /**
   * Hides the scrollbar and removes the scrollbar gutter padding
   */
  hideScrollbar?: boolean
  /**
   * Hides shadows indicating scrolling context
   */
  hideShadows?: boolean
  /**
   * Enables scroll-snap so items snap into place when scrolling stops
   */
  snap?: boolean
}

const {
  horizontal,
  hideScrollbar,
  hideShadows,
  snap,
} = defineProps<Props>()

const contentRef = useTemplateRef<HTMLElement>('content')

const { x, y } = useScroll(contentRef)

const showShadowLeft = computed(() => horizontal && x.value > 0)
const showShadowRight = computed(() => {
  if (!horizontal || !contentRef.value)
    return false
  return x.value < contentRef.value.scrollWidth - contentRef.value.clientWidth - 1
})
const showShadowTop = computed(() => !horizontal && y.value > 0)
const showShadowBottom = computed(() => {
  if (horizontal || !contentRef.value)
    return false
  return y.value < contentRef.value.scrollHeight - contentRef.value.clientHeight - 1
})
</script>

<template>
  <div
    class="overflow"
    :class="{
      'hide-scrollbar': hideScrollbar,
      'hide-shadows': hideShadows,
      'is-horizontal': horizontal,
      'is-vertical': !horizontal,
      'is-snap': snap,
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
