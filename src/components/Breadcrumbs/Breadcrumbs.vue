<script setup lang='ts'>
import type { VNode } from 'vue'
import type { BreadcrumbItemProps } from './BreadcrumbItem.vue'
import { Icon } from '@iconify/vue'
import './breadcrumbs.scss'

interface Props {
  separator?: string
}

const {
  separator = 'ph:caret-right',
} = defineProps<Props>()

const slots = defineSlots<{
  default: () => Array<VNode & { props: BreadcrumbItemProps }>
}>()
</script>

<template>
  <ul class="vui-breadcrumbs">
    <template v-for="(vnode, index) of slots.default()" :key="vnode.props.label">
      <component
        :is="vnode"
        v-bind="vnode.props"
      />
      <template v-if="index !== slots.default().length - 1">
        <Icon v-if="separator.length > 1 && separator.includes(':')" class="vui-breadcrumb-custom-separator" :icon="separator" />
        <span v-else class="vui-breadcrumb-custom-separator">{{ separator }}</span>
      </template>
    </template>
  </ul>
</template>
