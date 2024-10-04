<script setup lang='ts'>
import type { MaybeElement, UseFloatingOptions } from '@floating-ui/vue'
import { autoPlacement, autoUpdate, offset, useFloating } from '@floating-ui/vue'
import { useTemplateRef } from 'vue'

interface Props {
  anchor: MaybeElement<any>
  options?: UseFloatingOptions
}

const props = defineProps<Props>()
const popoutRef = useTemplateRef('popoutRef')

const { floatingStyles } = useFloating(props.anchor, popoutRef, Object.assign({
  middleware: [
    autoPlacement(),
    offset(8),
  ],
}, props.options))
</script>

<template>
  <div ref="popoutRef" :style="floatingStyles">
    <slot />
  </div>
</template>
