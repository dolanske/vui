<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, useTemplateRef, watch } from 'vue'
import './accordion.scss'

export interface AccordionProps {
  open?: boolean
  label?: string
}

const props = defineProps<AccordionProps>()

const emits = defineEmits<{
  open: []
  close: []
}>()
const isOpen = ref(!!props.open)
const content = useTemplateRef('content')
const contentMaxHeight = ref(0)

watch(isOpen, (value) => {
  if (value) {
    emits('open')
    contentMaxHeight.value = content.value?.scrollHeight || 0
  }
  else {
    emits('close')
  }
}, {
  flush: 'post',
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
</script>

<template>
  <div class="vui-accordion" :class="{ open: isOpen }">
    <!-- Completely custom header which needs to be styled and implemented by the developer -->
    <slot v-if="$slots.trigger" name="trigger" :open :close :toggle :is-open />
    <button v-else class="vui-accordion-header" @click="isOpen = !isOpen">
      <slot name="header">
        {{ props.label }}
      </slot>
      <Icon icon="ph:caret-down" />
    </button>

    <div ref="content" class="vui-accordion-content" :style="{ 'max-height': isOpen ? `${contentMaxHeight}px` : 0 }">
      <slot />
    </div>
  </div>
</template>
