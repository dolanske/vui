<script setup lang="ts">
import type { AccordionProps } from './Accordion.vue'
import { useId, useSlots } from 'vue'
import { enforceSlotType, useFlattenedSlot } from '../../shared/slots'
// Renderless component which is used to house multiple accordions which can be triggered together in some way

interface Props {
  /**
   * If set to true, if an accordion opens, all other close
   */
  single?: boolean
}

const props = defineProps<Props>()

// Since accordions do not have a child parent, we need to group them by a
// common id
const id = useId()

const slots = useSlots()
const flattened = useFlattenedSlot<AccordionProps>(slots.default)

function handleAccordionOpen(newIndex: number) {
  if (!props.single)
    return

  const grouped = document.querySelectorAll(`[data-accordion-group-id=${id}]`)

  grouped.forEach((item, index) => {
    if (index !== newIndex) {
      // @ts-expect-error We do a little accessin'
      item.__vnode.ctx.exposed.close()
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
    :data-accordion-group-id="id"
    @open="handleAccordionOpen(index)"
  />
</template>
