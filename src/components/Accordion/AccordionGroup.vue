<script setup lang="ts">
import type { VNode } from 'vue'
import type { AccordionProps } from './Accordion.vue'
import { ref } from 'vue'
// Renderless component which is used to house multiple accordions which can be triggered together in some way

interface Props {
  /**
   * If set to true, if an accordion opens, all other close
   */
  single?: boolean
}

const props = defineProps<Props>()

const slots = defineSlots<{
  default: () => Array<VNode & { props: AccordionProps }>
}>()

const activeIndex = ref<number>()

const defaultIndex = slots.default().findIndex(vnode => !!vnode.props.open)
if (defaultIndex > -1) {
  activeIndex.value = defaultIndex
}

function handleAccordionOpen(newIndex: number) {
  if (props.single) {
    activeIndex.value = newIndex
  }
}
</script>

<template>
  <component
    :is="item"
    v-for="(item, index) of slots.default()"
    :key="item"
    v-bind="{
      ...(activeIndex && { open: index === activeIndex }),
    }"
    @open="handleAccordionOpen(index)"
  />
</template>
