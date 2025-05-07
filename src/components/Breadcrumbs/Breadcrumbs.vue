<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import { useSlots } from 'vue'
import { enforceSlotType, useFlattenedSlot } from '../../shared/slots'
import './breadcrumbs.scss'

interface Props {
  separator?: string
}

const {
  separator = 'ph:caret-right',
} = defineProps<Props>()

const slots = useSlots()
const flattened = useFlattenedSlot(slots.default)
enforceSlotType(flattened, "BreadcrumbItem")
</script>

<template>
  <ul class="vui-breadcrumbs">
    <template v-for="(vnode, index) of flattened" :key="vnode.props?.label || index">
      <component :is="vnode" />
      <template v-if="index !== flattened.length - 1">
        <Icon v-if="separator.length > 1 && separator.includes(':')" class="vui-breadcrumb-custom-separator" :icon="separator" />
        <span v-else class="vui-breadcrumb-custom-separator">{{ separator }}</span>
      </template>
    </template>
  </ul>
</template>
