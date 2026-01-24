<script setup lang='ts'>
import { useAttrs } from 'vue'
import '../Button/button.scss'

export interface BreadcrumbItemProps {
  label?: string
  href?: string
}

defineOptions({ inheritAttrs: false })

const props = defineProps<BreadcrumbItemProps>()

const attrs = useAttrs()
</script>

<template>
  <li>
    <component
      :is="props.href ? 'a' : 'button'"
      v-if="props.href || attrs.onClick"
      :href="props.href"
      class="vui-breadcrumb-link"
      v-bind="attrs"
    >
      <slot>
        {{ props.label }}
      </slot>
    </component>

    <slot v-else>
      <span class="vui-breadcrumb-text-simple" v-bind="attrs">
        {{ props.label }}
      </span>
    </slot>
  </li>
</template>
