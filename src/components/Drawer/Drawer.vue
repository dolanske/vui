<script setup lang="ts">
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTrigger } from 'vaul-vue'
import Backdrop from '../../internal/Backdrop/Backdrop.vue'
import './drawer.scss'

const open = defineModel<boolean>()
</script>

<template>
  <DrawerRoot :open should-scale-background>
    <!-- <DrawerTrigger> Open </DrawerTrigger> -->
    <DrawerPortal>
      <DrawerContent class="vui-drawer-content">
        DialogTitle
        <p>Content</p>
      </DrawerContent>
      <DrawerOverlay class="vui-drawer-overlay" />
    </DrawerPortal>
  </DrawerRoot>
</template>
