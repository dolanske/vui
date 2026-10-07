<script setup lang="ts">
import type { AccordionGroupEntry } from './accordion'
import { provide, shallowReactive, watch } from 'vue'
import { ACCORDION_GROUP_KEY } from './accordion'

// Renderless component which is used to house multiple accordions which can be triggered together in some way

interface Props {
  /**
   * If set to true, if an accordion opens, all other close
   */
  single?: boolean
  /**
   * Values of accordions which should be open initially. Ignored when
   * `v-model` is used.
   */
  defaultOpen?: string[]
}

const props = defineProps<Props>()

/**
 * Values of the open accordions. Each Accordion's `value` prop is used, or an
 * automatically generated id when it is not set.
 */
const openValues = defineModel<string[]>()

const entries = shallowReactive(new Set<AccordionGroupEntry>())

function sameValues(a: string[] | undefined, b: string[]) {
  const current = a ?? []
  return current.length === b.length && current.every(value => b.includes(value))
}

function syncModel() {
  const next = [...entries].filter(entry => entry.isOpen.value).map(entry => entry.value.value)
  if (!sameValues(openValues.value, next))
    openValues.value = next
}

provide(ACCORDION_GROUP_KEY, {
  register(entry) {
    entries.add(entry)

    const initial = openValues.value ?? props.defaultOpen
    if (initial?.includes(entry.value.value))
      entry.open()

    return () => {
      entries.delete(entry)
      syncModel()
    }
  },
  onToggle(entry) {
    if (entry.isOpen.value && props.single) {
      for (const other of entries) {
        if (other !== entry)
          other.close()
      }
    }

    syncModel()
  },
})

// Apply external model changes to the accordions
watch(openValues, (values) => {
  if (!values)
    return

  for (const entry of entries) {
    const shouldBeOpen = values.includes(entry.value.value)
    if (shouldBeOpen && !entry.isOpen.value)
      entry.open()
    else if (!shouldBeOpen && entry.isOpen.value)
      entry.close()
  }
})
</script>

<template>
  <slot />
</template>
