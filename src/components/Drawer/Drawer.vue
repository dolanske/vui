<script setup lang="ts">
import type { DrawerPortalProps, DrawerRootProps } from 'vaul-vue'
import type { Sizes, VueClass } from '../../shared/types'
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTitle } from 'vaul-vue'
import { computed, useId } from 'vue'
import './drawer.scss'

interface Props {
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

const {
  title,
  containerClass,
  containerSize = 'm',
  rootProps,
  portalProps,
  handle = true,
} = defineProps<Props>()
const open = defineModel<boolean>()

const mW = computed(() => {
  if (typeof containerSize === 'string') {
    if (containerClass === 'full') {
      return '100%'
    }
    else {
      return `var(--container-${containerSize})`
    }
  }
  else {
    return `${containerSize}px`
  }
})

const id = useId()
</script>

<template>
  <DrawerRoot
    :open
    should-scale-background
    v-bind="rootProps"
    @close="open = false"
    @update:open="(state) => open = state"
  >
    <DrawerPortal v-bind="portalProps">
      <DrawerOverlay class="vui-drawer-overlay" />
      <DrawerContent class="vui-drawer-content" :class="{ 'hide-handlk': handle === false }" :aria-describedby="id">
        <div class="vui-drawer-container container" :class="containerClass">
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
  transition: var(--transition-quick);
  background-color: var(--color-bg);
}

.vui-drawer-container.container {
  max-width: v-bind(mW);
}
</style>
