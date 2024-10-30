<script setup lang="ts">
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot } from 'vaul-vue'
import { onBeforeMount, onBeforeUnmount } from 'vue'
import Backdrop from '../../internal/Backdrop/Backdrop.vue'
import './drawer.scss'

const open = defineModel<boolean>()

const app = document.querySelector('#app')!

onBeforeMount(() => {
  app.setAttribute('vaul-drawer-wrapper', '')
})

onBeforeUnmount(() => {
  if (app.hasAttribute('vaul-drawer-wrapper'))
    app.removeAttribute('vaul-drawer-wrapper')
})
</script>

<template>
  <DrawerRoot :open should-scale-background fixed @close="open = false">
    <!-- <DrawerTrigger> Open </DrawerTrigger> -->
    <DrawerPortal>
      <DrawerOverlay class="vui-drawer-overlay" />
      <DrawerContent class="vui-drawer-content">
        <DrawerHandle />
        <p>Content</p>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
