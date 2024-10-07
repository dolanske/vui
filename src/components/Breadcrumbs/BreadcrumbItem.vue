<script setup lang='ts'>
import '../Button/button.scss'

export interface BreadcrumbItemProps {
  label?: string
  path?: string
}

const props = defineProps<BreadcrumbItemProps>()

// const slots = defineSlots<{
//   default: () => any
// }>()
</script>

<template>
  <li>
    <a v-if="props.path" :href="props.path" class="vui-breadcrumb-link">
      <slot>
        {{ props.label }}
      </slot>
    </a>

    <slot v-else>
      <span class="vui-breadcrumb-text-simple">
        {{ props.label }}
      </span>
    </slot>
  </li>
</template>
