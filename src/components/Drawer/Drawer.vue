<script setup lang="ts">
import type { DrawerPortalProps, DrawerRootProps } from 'vaul-vue'
import type { Sizes, VueClass } from '../../shared/types'
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerRootNested, DrawerTitle } from 'vaul-vue'
import { computed, onMounted, onUnmounted, ref, useAttrs, useId, watch, watchEffect } from 'vue'
import { useLayer } from '../../shared/layerManager'
import './drawer.scss'

interface Props {
  /**
   * Controls the visibility of the drawer
   */
  open?: boolean
  /**
   * Title for accessibility.
   */
  title?: string
  /**
   * CSS class applied to the container of the drawer content. Accepts Vue's
   * class conditional declaration, string, object or an array.
   */
  containerClass?: VueClass
  /**
   * Size of the container. Either use a preset size or number to specify
   * max-width of the container.
   */
  containerSize?: Sizes | 'xl' | 'full' | number
  /**
   * Wether to display the handle symbol. It doesn't actually do anything, it's
   * just for the visuals.
   */
  handle?: boolean
  /**
   * When true, uses Vaul's nested drawer root. Required when this drawer is
   * rendered inside another <Drawer>.
   */
  nested?: boolean
  /**
   * Active snap point in controlled mode. Supports v-model:activeSnapPoint.
   * Takes precedence over rootProps.activeSnapPoint.
   */
  activeSnapPoint?: number | string | null
  /**
   * Control the underlying Vaul root component
   */
  rootProps?: DrawerRootProps
  portalProps?: DrawerPortalProps
}

defineOptions({
  inheritAttrs: false,
})

const {
  title,
  containerClass,
  containerSize = 'm',
  rootProps,
  portalProps,
  handle = true,
  open = false,
  nested = false,
  activeSnapPoint,
} = defineProps<Props>()

const emit = defineEmits<{
  'close': []
  'update:activeSnapPoint': [value: number | string | null]
}>()

const attrs = useAttrs()

// const mW = computed(() => {
//   if (typeof containerSize === 'string') {
//     if (containerSize === 'full') {
//       return '100%'
//     }
//     else {
//       return getComputedStyle(document.documentElement)
//         .getPropertyValue(`--container-${containerSize}`)
//     }
//   }
//   else {
//     return `${containerSize}px`
//   }
// })

const id = useId()

const hasSnapPoints = computed(() => !!(rootProps?.snapPoints?.length))

// Track active snap point so the container max-height can match the currently
// visible portion of the drawer at every snap position.
const internalActiveSnapPoint = ref<number | string | null>(
  activeSnapPoint ?? rootProps?.activeSnapPoint ?? rootProps?.snapPoints?.[0] ?? null,
)

// vaul-vue fires update:active-snap-point → snapPoints[0] unconditionally
// 500ms after close. If the drawer is reopened within that window the event
// lands in an already-open drawer and snaps it back to the smallest position.
// We suppress it by watching the close lifecycle and a short drag-release flag.
const justReleasedFromDrag = ref(false)
const isResettingFromClose = ref(false)
let releaseTimer: ReturnType<typeof setTimeout> | null = null
let closeResetTimer: ReturnType<typeof setTimeout> | null = null

onUnmounted(() => {
  if (releaseTimer)
    clearTimeout(releaseTimer)
  if (closeResetTimer)
    clearTimeout(closeResetTimer)
})

// Merge top-level activeSnapPoint into rootProps so DrawerRoot always
// receives a single reconciled value. Top-level prop wins over rootProps.
// When snap points are present we always pass activeSnapPoint explicitly so
// vaul operates in controlled mode — that way our guard (handleSnapPointUpdate)
// is the only thing that can move the snap position.
const mergedRootProps = computed(() => {
  // Intercept vaul's onRelease to set the justReleasedFromDrag flag.
  // Legitimate snap-point changes always arrive within ~100ms of a drag release.
  const handleRelease = (isOpen: boolean) => {
    justReleasedFromDrag.value = true
    if (releaseTimer)
      clearTimeout(releaseTimer)
    releaseTimer = setTimeout(() => (justReleasedFromDrag.value = false), 100)
    ;(rootProps as any)?.onRelease?.(isOpen)
  }

  const base = { ...rootProps, onRelease: handleRelease }

  if (rootProps?.snapPoints?.length) {
    return {
      ...base,
      activeSnapPoint: activeSnapPoint !== undefined
        ? activeSnapPoint
        : internalActiveSnapPoint.value,
    }
  }

  return activeSnapPoint !== undefined
    ? { ...base, activeSnapPoint }
    : base
})

// Sync internalActiveSnapPoint when the controlled value changes externally.
watch(
  () => activeSnapPoint ?? rootProps?.activeSnapPoint,
  (val) => {
    if (val !== undefined) {
      internalActiveSnapPoint.value = val ?? null
    }
  },
)

// Re-initialise to the first snap whenever the drawer (re-)opens.
// Also start the close-reset guard window when it closes.
watch(
  () => open,
  (isOpen, wasOpen) => {
    if (isOpen && rootProps?.snapPoints?.length && activeSnapPoint === undefined && rootProps.activeSnapPoint === undefined) {
      internalActiveSnapPoint.value = rootProps.snapPoints[0]
    }
    if (!isOpen && wasOpen && rootProps?.snapPoints?.length) {
      isResettingFromClose.value = true
      if (closeResetTimer)
        clearTimeout(closeResetTimer)
      // 600ms > vaul's 500ms close timer so we always cover the stale event
      closeResetTimer = setTimeout(() => (isResettingFromClose.value = false), 600)
    }
  },
)

// References the CSS variable so overriding padding-top in SCSS automatically
// keeps the JS max-height calculation in sync without any extra wiring.
const TOP = 'var(--vui-drawer-top-offset, 28px)'

// Max-height of the scroll container = the visible portion of the drawer at
// the current snap point, minus the handle/padding-top.
const containerMaxHeight = computed(() => {
  if (!hasSnapPoints.value) {
    return `calc(95dvh - ${TOP})`
  }
  const sp = internalActiveSnapPoint.value ?? rootProps?.snapPoints?.[0]
  if (sp == null) {
    return `calc(100dvh - ${TOP})`
  }
  if (typeof sp === 'number') {
    // sp is a fraction (0–1): visible height = sp × 100dvh
    return `calc(${sp * 100}dvh - ${TOP})`
  }
  if (typeof sp === 'string' && sp.endsWith('px')) {
    return `calc(${sp} - ${TOP})`
  }
  return `calc(100dvh - ${TOP})`
})

// Guarded snap-point update handler.
// Drops the stale reset-to-first-snap event that vaul fires 500ms after close.
function handleSnapPointUpdate(val: number | string | null) {
  const isStaleCloseReset
    = isResettingFromClose.value
      && !justReleasedFromDrag.value
      && val === (rootProps?.snapPoints?.[0] ?? null)

  if (!isStaleCloseReset) {
    internalActiveSnapPoint.value = val ?? null
    emit('update:activeSnapPoint', val)
  }
}

onMounted(() => {
  // The wrapper attribute is only required for the background scaling effect.
  if (rootProps?.shouldScaleBackground && !document.querySelector('[vaul-drawer-wrapper]')) {
    console.error('Your root component is missing \'vaul-drawer-wrapper\' attribute. \n Without it the background scaling effect will not work.')
  }
})

const { layerIndex, openLayer, closeLayer } = useLayer()

watchEffect(() => {
  if (open) {
    openLayer()
  }
  else {
    closeLayer()
  }
})
</script>

<template>
  <component
    :is="nested ? DrawerRootNested : DrawerRoot"
    :open
    v-bind="mergedRootProps"
    :aria-describedby="id"
    @close="emit('close')"
    @update:open="(state) => state === false && emit('close')"
    @update:active-snap-point="handleSnapPointUpdate"
  >
    <DrawerPortal v-bind="portalProps">
      <DrawerOverlay class="vui-drawer-overlay" />
      <DrawerContent
        class="vui-drawer-content"
        :class="{ 'hide-handle': handle === false, 'has-snap-points': hasSnapPoints }"
        v-bind="attrs"
        :style="{ zIndex: layerIndex }"
        :aria-describedby="undefined"
      >
        <div
          :key="containerSize"
          class="vui-drawer-container"
          :class="[containerSize ? `container-${containerSize}` : undefined, containerClass]"
          :style="[{ 'max-height': containerMaxHeight }]"
          data-vaul-no-drag
        >
          <DrawerTitle class="visually-hidden" :name="id">
            {{ title }}
          </DrawerTitle>
          <div v-if="$slots.header" class="vui-drawer-header">
            <slot name="header" />
          </div>

          <slot />
        </div>
      </DrawerContent>
    </DrawerPortal>
  </component>
</template>
