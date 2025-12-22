<script setup lang="ts">
import type { DrawerPortalProps, DrawerRootProps } from 'vaul-vue'
import type { Sizes, VueClass } from '../../shared/types'
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTitle } from 'vaul-vue'
import { computed, onMounted, useAttrs, useId } from 'vue'
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
} = defineProps<Props>()

const emit = defineEmits<{ close: [] }>()

const attrs = useAttrs()

const mW = computed(() => {
  if (typeof containerSize === 'string') {
    if (containerSize === 'full') {
      return '100%'
    }
    else {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(`--container-${containerSize}`)
    }
  }
  else {
    return `${containerSize}px`
  }
})

const id = useId()

onMounted(() => {
  if (!document.querySelector('[vaul-drawer-wrapper]')) {
    console.error('Your root component is missing \'vaul-drawer-wrapper\' attribute. \n Without it the <Drawer /> component will not be functional.')
  }
})
</script>

<template>
  <DrawerRoot
    :open
    v-bind="rootProps"
    :aria-describedby="id"
    @close="emit('close')"
    @update:open="(state) => state === false && emit('close')"
  >
    <DrawerPortal v-bind="portalProps">
      <DrawerOverlay class="vui-drawer-overlay" />
      <DrawerContent class="vui-drawer-content" :class="{ 'hide-handle': handle === false }" v-bind="attrs">
        <div :key="mW" class="vui-drawer-container container" :class="containerClass" :style="{ 'max-width': mW }">
          <DrawerTitle class="visually-hidden" :name="id">
            {{ title }}
          </DrawerTitle>
          <slot />
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>

<style lang="scss" scoped>
:global(body) {
  transition: var(--transition-fast);
  background-color: var(--color-bg);
}
</style>
