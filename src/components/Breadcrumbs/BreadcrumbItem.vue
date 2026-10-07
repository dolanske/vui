<script setup lang='ts'>
import type { Component } from 'vue'
import { computed, inject, useAttrs, useTemplateRef } from 'vue'
import { BREADCRUMBS_KEY } from './breadcrumbs'
import '../Button/button.scss'

export interface BreadcrumbItemProps {
  label?: string
  href?: string
  /**
   * Element or component to render the link with, e.g. `RouterLink` or
   * `NuxtLink` together with a `to` attribute
   */
  as?: string | Component
  /**
   * Marks the item as the current page. Defaults to `true` for the last item.
   */
  current?: boolean
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BreadcrumbItemProps>(), {
  current: undefined,
})

const attrs = useAttrs()
const context = inject(BREADCRUMBS_KEY, null)
const itemRef = useTemplateRef('item')

const isCurrent = computed(() => props.current ?? (!!itemRef.value && context?.lastItem.value === itemRef.value))

// Renders the separator provided by the parent Breadcrumbs
function Separator() {
  return context?.renderSeparator()
}
</script>

<template>
  <li ref="item" class="vui-breadcrumb-item">
    <component
      :is="props.as ?? (props.href ? 'a' : 'button')"
      v-if="props.as || props.href || attrs.onClick"
      :href="props.href"
      :type="!props.as && !props.href ? 'button' : undefined"
      class="vui-breadcrumb-link"
      :aria-current="isCurrent ? 'page' : undefined"
      v-bind="attrs"
    >
      <slot>
        {{ props.label }}
      </slot>
    </component>

    <span v-else class="vui-breadcrumb-text-simple" :aria-current="isCurrent ? 'page' : undefined" v-bind="attrs">
      <slot>
        {{ props.label }}
      </slot>
    </span>

    <!-- Hidden on the last item via CSS, so it is correct before mount and during SSR -->
    <span v-if="context" class="vui-breadcrumb-separator" aria-hidden="true">
      <Separator />
    </span>
  </li>
</template>
