<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import { computed, ref, useTemplateRef } from 'vue'
import './marquee.scss'

interface Props {
  /**
   * Animation direction
   */
  direction?: 'left' | 'right'
  /**
   * Speed in pixels/s
   */
  speed?: number
  /**
   * Stepped/jerky movement instead of smooth scroll
   */
  stagger?: boolean
  /**
   * Pauses the animation while hovered. Moving content which can not be
   * paused fails WCAG 2.2.2, only disable this when another pause mechanism
   * exists.
   */
  pauseOnHover?: boolean
}

const {
  speed = 50,
  direction = 'right',
  stagger,
  pauseOnHover = true,
} = defineProps<Props>()

const wrapRef = useTemplateRef<HTMLElement>('wrap')
const contentRef = useTemplateRef<HTMLElement>('content')
const contentWidth = ref(0)
const wrapWidth = ref(0)

// One copy of the content is measured. Enough copies are rendered to always
// cover the visible area, so narrow content never leaves an empty gap.
useResizeObserver(contentRef, ([entry]) => {
  contentWidth.value = entry?.target.scrollWidth ?? 0
})

useResizeObserver(wrapRef, ([entry]) => {
  wrapWidth.value = entry?.contentRect.width ?? 0
})

// The track moves by exactly one copy, the extra copies fill the rest
const copies = computed(() => {
  if (contentWidth.value === 0)
    return 1
  return Math.max(1, Math.ceil(wrapWidth.value / contentWidth.value)) + 1
})

const duration = computed(() => contentWidth.value > 0 ? contentWidth.value / speed : 0)

const timingFunction = computed(() => {
  if (!stagger || contentWidth.value === 0)
    return 'linear'

  // Divide the animation into steps based on content width to create a stagger effect
  const steps = Math.max(1, Math.round(contentWidth.value / 50))
  return `steps(${steps}, end)`
})
</script>

<template>
  <div ref="wrap" class="marquee-wrap" :class="{ 'pause-on-hover': pauseOnHover }">
    <div
      class="marquee-track"
      :style="{
        '--vui-marquee-distance': `-${contentWidth}px`,
        'animationDuration': `${duration}s`,
        'animationDirection': direction === 'left' ? 'normal' : 'reverse',
        'animationTimingFunction': timingFunction,
        'visibility': contentWidth > 0 ? 'visible' : 'hidden',
      }"
    >
      <div ref="content" class="marquee-content">
        <slot />
      </div>
      <!-- Visual copies only. Inert keeps links and buttons inside them out of
        the Tab order and hidden from assistive technology. -->
      <div
        v-for="copy in copies - 1"
        :key="copy"
        class="marquee-content"
        aria-hidden="true"
        inert
      >
        <slot />
      </div>
    </div>
  </div>
</template>
