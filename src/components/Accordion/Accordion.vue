<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useResizeObserver } from '@vueuse/core'
import { onBeforeMount, onMounted, ref, useTemplateRef, watch, watchEffect } from 'vue'
import './accordion.scss'

export interface AccordionProps {
  open?: boolean
  label?: string
  card?: boolean
  unstyled?: boolean
}

const props = defineProps<AccordionProps>()
const emits = defineEmits<{
  open: []
  close: []
}>()

const isOpen = ref(false)
const contentRef = useTemplateRef('content')
const contentMaxHeight = ref(0)

watchEffect(() => {
  isOpen.value = props.open
}, {
  flush: 'post',
})

watch(isOpen, (value) => {
  if (value) {
    emits('open')
    contentMaxHeight.value = contentRef.value?.scrollHeight || 0
  }
  else {
    emits('close')
  }
}, {
  flush: 'post',
  immediate: true,
})

function open() {
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function toggle() {
  isOpen.value = !isOpen.value
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

onMounted(() => {
  useResizeObserver(contentRef, ([entry]) => {
    if (isOpen.value && contentMaxHeight.value !== entry.contentRect.height) {
      contentMaxHeight.value = entry.contentRect.height || 0
    }
  })
})
</script>

<template>
  <div class="vui-accordion" :class="{ 'open': isOpen, 'is-card': !!props.card && !props.unstyled, 'is-unstyled': !!props.unstyled }">
    <!-- Completely custom header which needs to be styled and implemented by the developer -->
    <slot v-if="$slots.trigger" name="trigger" :open :close :toggle :is-open />
    <button v-else class="vui-accordion-header" @click="isOpen = !isOpen">
      <slot name="header">
        {{ props.label }}
      </slot>
      <Icon v-if="!props.unstyled" icon="ph:caret-down" />
    </button>

    <div
      class="vui-accordion-content"
      :aria-hidden="!isOpen"
      :style="{ 'max-height': isOpen ? `${contentMaxHeight}px` : '0px' }"
    >
      <div ref="content" class="vui-accordtion-content-inner">
        <slot />
      </div>
    </div>
  </div>
</template>
