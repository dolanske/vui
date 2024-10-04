<script setup lang="ts">
import type { VNode } from 'vue'
import type { AccordionProps } from './Accordion.vue'
import type Accordion from './Accordion.vue'
import { useTemplateRef } from 'vue'
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

const accordionRefs = useTemplateRef<InstanceType<typeof Accordion>[]>('accordionRefs')

function handleAccordionOpen(newIndex: number) {
  if (!accordionRefs.value || !props.single)
    return

  accordionRefs.value.forEach((item, index) => {
    if (index !== newIndex) {
      item.close()
    }
  })
}
</script>

<template>
  <component
    :is="item"
    v-for="(item, index) of slots.default()"
    ref="accordionRefs"
    :key="item"
    @open="handleAccordionOpen(index)"
  />
</template>
