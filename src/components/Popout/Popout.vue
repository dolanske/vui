<script setup lang='ts'>
import type { MaybeElement, UseFloatingOptions } from '@floating-ui/vue'
import { autoPlacement, offset, useFloating } from '@floating-ui/vue'
import { toRef, useTemplateRef } from 'vue'

interface Props {
  anchor: MaybeElement<any>
  options?: UseFloatingOptions
}

const props = defineProps<Props>()
const popoutRef = useTemplateRef('popoutRef')

const anchor = toRef(props.anchor)
const options = toRef(Object.assign({
  middleware: [
    autoPlacement(),
    offset(8),
  ],
}, props.options))

const { floatingStyles } = useFloating(anchor, popoutRef, options)
</script>

<template>
  <div ref="popoutRef" :style="floatingStyles">
    <slot />
  </div>
</template>
