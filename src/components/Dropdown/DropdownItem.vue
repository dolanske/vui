<script setup lang='ts'>
import type { Component } from 'vue'
import { computed, inject } from 'vue'
import { MENU_KEY } from '../../lib/menu'
import './dropdown-item.scss'

interface Props {
  disabled?: boolean
  size?: 's' | 'm'
  /**
   * Keeps the parent menu open after the item is activated, e.g. for
   * toggles or multi selection
   */
  keepOpen?: boolean
  /**
   * Renders the item as a link
   */
  href?: string
  /**
   * Element or component to render, e.g. `RouterLink` / `NuxtLink` together
   * with a `to` attribute
   */
  as?: string | Component
  /**
   * ARIA role. Defaults to `menuitem` inside menus (Dropdown, ContextMenu,
   * Menubar) and to no role elsewhere, e.g. when used for Sidebar navigation.
   */
  role?: 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'option'
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const menu = inject(MENU_KEY, null)

const tag = computed(() => props.as ?? (props.href ? 'a' : 'button'))
const isButton = computed(() => tag.value === 'button')
const resolvedRole = computed(() => props.role ?? (menu ? 'menuitem' : undefined))

function onClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  emit('click', event)

  if (!props.keepOpen && !event.defaultPrevented)
    menu?.close(true)
}
</script>

<template>
  <component
    :is="tag"
    class="vui-dropdown-item"
    :class="{
      disabled: props.disabled,
      [`vui-dropdown-item-size-${props.size}`]: props.size,
    }"
    :type="isButton ? 'button' : undefined"
    :href="props.disabled ? undefined : props.href"
    :role="resolvedRole"
    :disabled="isButton ? props.disabled : undefined"
    :aria-disabled="props.disabled ? 'true' : undefined"
    :tabindex="props.disabled && !isButton ? -1 : undefined"
    @click="onClick"
  >
    <!-- This should always be here to offset items which dont have icons -->
    <div class="vui-dropdown-item-icon" aria-hidden="true">
      <slot name="icon" />
    </div>

    <div class="vui-dropdown-item-slot">
      <slot />
    </div>

    <div v-if="$slots.hint" class="vui-dropdown-item-hint">
      <slot name="hint" />
    </div>

    <div v-if="$slots.iconEnd" class="vui-dropdown-item-icon-end" aria-hidden="true">
      <slot name="iconEnd" />
    </div>
  </component>
</template>
