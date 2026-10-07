<script setup lang="ts">
import type { AccordionGroupEntry } from './accordion'
import { IconCaretDown } from '@iconify-prerendered/vue-ph'
import { useResizeObserver } from '@vueuse/core'
import { inject, onBeforeMount, onUnmounted, ref, toRef, useId, useTemplateRef, watch } from 'vue'
import { ACCORDION_GROUP_KEY } from './accordion'
import './accordion.scss'

export interface AccordionProps {
  /**
   * Whether the accordion is open. Supports `v-model:open`.
   */
  open?: boolean
  label?: string
  card?: boolean
  unstyled?: boolean
  /**
   * Identifies the accordion inside an `AccordionGroup` v-model. Generated
   * automatically when omitted.
   */
  value?: string
  /**
   * Prevents the accordion from being toggled
   */
  disabled?: boolean
}

const props = defineProps<AccordionProps>()
const emits = defineEmits<{
  'open': []
  'close': []
  'update:open': [value: boolean]
}>()

const isOpen = ref(!!props.open)
const contentRef = useTemplateRef<HTMLElement>('content')
const contentMaxHeight = ref(0)

const id = useId()
const headerId = `${id}-header`
const panelId = `${id}-panel`

// Keep following the prop when it changes from the outside
watch(() => props.open, (value) => {
  isOpen.value = !!value
})

// Events are only emitted for actual changes, never on mount
watch(isOpen, (value) => {
  if (value)
    emits('open')
  else
    emits('close')

  if (value !== !!props.open)
    emits('update:open', value)
})

// The content height is always measured the same way (scrollHeight includes
// padding), both when opening and when the content resizes while open
function measure() {
  contentMaxHeight.value = contentRef.value?.scrollHeight ?? 0
}

watch(isOpen, (value) => {
  if (value)
    measure()
}, { flush: 'post', immediate: true })

useResizeObserver(contentRef, () => {
  if (isOpen.value)
    measure()
})

// Register with a parent AccordionGroup, if there is one
const group = inject(ACCORDION_GROUP_KEY, null)
const fallbackValue = useId()

if (group) {
  const entry: AccordionGroupEntry = {
    value: toRef(() => props.value ?? fallbackValue),
    isOpen,
    open: () => open(),
    close: () => close(),
  }

  onUnmounted(group.register(entry))
  watch(isOpen, () => group.onToggle(entry))
}

function open() {
  if (!props.disabled)
    isOpen.value = true
}

function close() {
  if (!props.disabled)
    isOpen.value = false
}

function toggle() {
  if (isOpen.value)
    close()
  else
    open()
}

defineExpose({
  open,
  close,
  toggle,
  isOpen,
})

onBeforeMount(() => {
  if (props.card && props.unstyled) {
    console.warn('[Accordion] Both \'card\' and \'unstyled\' props are selected. Unstyled will take precedence.')
  }
})
</script>

<template>
  <div
    class="vui-accordion"
    :class="{ 'open': isOpen, 'is-card': !!props.card && !props.unstyled, 'is-unstyled': !!props.unstyled, 'disabled': props.disabled }"
  >
    <!-- Completely custom header which needs to be styled and implemented by the developer.
      Bind `attrs` to the trigger element to keep it accessible. -->
    <slot
      v-if="$slots.trigger"
      name="trigger"
      :open
      :close
      :toggle
      :is-open
      :attrs="{ 'id': headerId, 'aria-expanded': isOpen, 'aria-controls': panelId, 'aria-disabled': props.disabled || undefined }"
    />
    <button
      v-else
      :id="headerId"
      type="button"
      class="vui-accordion-header"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      :disabled="props.disabled"
      @click="toggle"
    >
      <slot name="header">
        {{ props.label }}
      </slot>
      <IconCaretDown v-if="!props.unstyled" aria-hidden="true" />
    </button>

    <!-- Collapsed content is inert, so it can not be reached with Tab -->
    <div
      :id="panelId"
      class="vui-accordion-content"
      role="region"
      :aria-labelledby="headerId"
      :inert="!isOpen || undefined"
      :style="{ 'max-height': isOpen ? `${contentMaxHeight}px` : '0px' }"
    >
      <div ref="content" class="vui-accordion-content-inner">
        <slot />
      </div>
    </div>
  </div>
</template>
