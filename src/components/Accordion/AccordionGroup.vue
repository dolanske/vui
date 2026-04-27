<script setup lang="ts">
import type { AccordionProps } from './Accordion.vue'
import { useTemplateRef } from 'vue'
import { enforceSlotType, useFlattenedSlot } from '../../shared/slots'
// Renderless component which is used to house multiple accordions which can be triggered together in some way

interface AccordionExposed {
  close: () => void
}

interface Props {
  /**
   * If set to true, if an accordion opens, all other close
   */
  single?: boolean
}

const props = defineProps<Props>()

const slots = defineSlots()

const flattened = useFlattenedSlot<AccordionProps>(slots.default)
const accordionRefs = useTemplateRef<Array<AccordionExposed | null>>('accordion')

function handleAccordionOpen(newIndex: number) {
  if (!props.single)
    return

  accordionRefs.value?.forEach((accordion, index) => {
    if (index !== newIndex) {
      accordion?.close()
    }
  })
}

enforceSlotType(flattened, 'Accordion')
</script>

<template>
  <component
    :is="item"
    v-for="(item, index) of flattened"
    :key="item"
    ref="accordion"
    @open="handleAccordionOpen(index)"
  />
</template>
