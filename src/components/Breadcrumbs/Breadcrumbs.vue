<script setup lang='ts'>
import { IconCaretRight } from '@iconify-prerendered/vue-ph'
import { enforceSlotType, useFlattenedSlot } from '../../shared/slots'
import './breadcrumbs.scss'

interface Props {
  separator?: string
}

const { separator } = defineProps<Props>()

const slots = defineSlots()
const flattened = useFlattenedSlot(slots.default)
enforceSlotType(flattened, 'BreadcrumbItem')
</script>

<template>
  <ul class="vui-breadcrumbs">
    <template v-for="(vnode, index) of flattened" :key="vnode.props?.label || index">
      <component :is="vnode" />
      <template v-if="index !== flattened.length - 1">
        <slot v-if="!separator" name="separator">
          <IconCaretRight class="vui-breadcrumb-custom-separator" />
        </slot>
        <span v-else class="vui-breadcrumb-custom-separator">{{ separator }}</span>
      </template>
    </template>
  </ul>
</template>
