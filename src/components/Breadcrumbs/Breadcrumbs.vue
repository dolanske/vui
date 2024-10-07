<script setup lang='ts'>
import type { VNode } from 'vue'
import type { BreadcrumbItemProps } from './BreadcrumbItem.vue'
import { Icon, iconExists } from '@iconify/vue'
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
    <template v-for="vnode of slots.default()" :key="vnode.props.label">
      <component
        :is="vnode"
        v-bind="vnode.props"
      />
      <Icon v-if="iconExists(separator)" :icon="separator" />
      <span v-else class="vui-breadcrumb-custom-separator">{{ separator }}</span>
    </template>
  </ul>
</template>
