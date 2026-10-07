<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useScrollEdges } from '../../lib/scroll'
import './overflow.scss'

export interface Props {
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
  /**
   * Accessible name of the scrollable region
   */
  label?: string
}

const {
  horizontal,
  hideScrollbar,
  hideShadows,
  snap,
  label,
} = defineProps<Props>()

const contentRef = useTemplateRef<HTMLElement>('content')

// Updates on scroll, resize and content changes, not only on scroll
const { canScrollLeft, canScrollRight, canScrollUp, canScrollDown, overflowsX, overflowsY } = useScrollEdges(contentRef)

const showShadowLeft = computed(() => horizontal && canScrollLeft.value)
const showShadowRight = computed(() => horizontal && canScrollRight.value)
const showShadowTop = computed(() => !horizontal && canScrollUp.value)
const showShadowBottom = computed(() => !horizontal && canScrollDown.value)

// Scrollable regions must be reachable with the keyboard, so they can be
// scrolled with the arrow keys
const isScrollable = computed(() => horizontal ? overflowsX.value : overflowsY.value)

defineExpose({
  contentRef,
})
</script>

<template>
  <div
    class="vui-overflow"
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
      <div
        ref="content"
        class="overflow-content"
        :tabindex="isScrollable ? 0 : undefined"
        :role="label ? 'region' : undefined"
        :aria-label="label"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
