<script setup lang='ts'>
import '../Button/button.scss'

export interface BreadcrumbItemProps {
  label?: string
  href?: string
}

const props = defineProps<BreadcrumbItemProps>()
</script>

<template>
  <li>
    <a v-if="props.href" :href="props.href" class="vui-breadcrumb-link">
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
