<script setup lang="ts">
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTitle } from 'vaul-vue'
import './drawer.scss'

interface Props {
  title?: string
}

const props = defineProps<Props>()
const open = defineModel<boolean>()
</script>

<template>
  <DrawerRoot
    :open
    should-scale-background
    @close="open = false"
    @release="open = false"
  >
    <DrawerPortal>
      <DrawerOverlay class="vui-drawer-overlay" />
      <DrawerContent class="vui-drawer-content">
        <div class="vui-drawer-container">
          <DrawerTitle class="visually-hidden">
            {{ props.title }}
          </DrawerTitle>
          <p>Content</p>
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
