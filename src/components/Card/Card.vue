<script setup lang="ts">
import Divider from '../Divider/Divider.vue'
import './card.scss'

interface Props {
  separators?: boolean
  headerSeparator?: boolean
  footerSeparator?: boolean
  padding?: boolean
}

const {
  padding = true,
  separators,
  headerSeparator,
  footerSeparator,
} = defineProps<Props>()
</script>

<template>
  <div
    class="vui-card" :class="{
      separators,
      'header-separator': headerSeparator,
      'footer-separator': footerSeparator,
      'no-padding': !padding,
    }"
  >
    <div v-if="$slots.header || $slots['header-end']" class="vui-card-header">
      <div>
        <slot name="header" />
      </div>
      <slot name="header-end" />
    </div>

    <Divider v-if="(separators || headerSeparator) && ($slots.header || $slots['header-end'])" :height="1" />

    <div class="vui-card-content">
      <slot />
    </div>

    <Divider v-if="(separators || footerSeparator) && $slots.footer" :height="1" />

    <div v-if="$slots.footer" class="vui-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
