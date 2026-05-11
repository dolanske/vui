<script setup lang="ts">
import Divider from '../Divider/Divider.vue'
import './card.scss'

export interface Props {
  separators?: boolean
  headerSeparator?: boolean
  footerSeparator?: boolean
  padding?: boolean
  headerAlign?: 'start' | 'center' | 'end' | 'baseline'
  centered?: boolean
  borderStyle?: 'solid' | 'dashed' | 'dotted' | (string & {})
}

const {
  padding = true,
  separators,
  headerSeparator,
  footerSeparator,
  headerAlign,
  centered,
  borderStyle = 'solid',
} = defineProps<Props>()
</script>

<template>
  <div
    class="vui-card" :class="{
      separators,
      'header-separator': separators || headerSeparator,
      'footer-separator': separators || footerSeparator,
      'no-padding': !padding,
      centered,

    }"
    :style="{
      '--vui-card-header-align': headerAlign,
      '--vui-card-border-style': borderStyle,
    }"
  >
    <div v-if="$slots.header || $slots['header-end']" class="vui-card-header">
      <div class="flex-1">
        <slot name="header" />
      </div>
      <slot name="header-end" />
    </div>

    <Divider v-if="(separators || headerSeparator) && ($slots.header || $slots['header-end'])" :type="borderStyle" :size="1" />

    <div v-if="$slots.default" class="vui-card-content">
      <slot />
    </div>

    <Divider v-if="(separators || footerSeparator) && $slots.footer" :type="borderStyle" :size="1" />

    <div v-if="$slots.footer" class="vui-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
