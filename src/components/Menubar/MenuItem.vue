<script setup lang="ts">
import type { MenubarContext } from './menubar'
import { inject, useTemplateRef } from 'vue'
import Popout from '../Popout/Popout.vue'
import { MENUBAR_KEY } from './menubar'
import '../Dropdown/dropdown.scss'

const { openIndex, register, open, close } = inject<MenubarContext>(MENUBAR_KEY)!

const index = register()
const triggerRef = useTemplateRef('trigger')

const isOpen = () => openIndex.value === index

function handleClick() {
  if (isOpen()) {
    close()
  }
  else {
    open(index)
  }
}

function handleMouseenter() {
  if (openIndex.value !== null) {
    open(index)
  }
}
</script>

<template>
  <div
    ref="trigger"
    class="vui-dropdown-trigger-wrap"
    @click="handleClick"
    @mouseenter="handleMouseenter"
  >
    <slot />
  </div>
  <Popout
    :anchor="triggerRef"
    :visible="isOpen()"
    placement="bottom-start"
    @click-outside="close"
  >
    <slot name="menu" />
  </Popout>
</template>
