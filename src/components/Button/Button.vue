<script setup lang="ts">
import Spinner from '../Spinner/Spinner.vue'
import './button.scss'

interface Props {
  // Provide URL to turn button into anchor
  href?: string
  target?: string

  // TODO: color variants

  //
  loading?: boolean
  expand?: boolean
  square?: boolean
  disabled?: boolean

  size?: 's' | 'm' | 'l'

  textAlign?: 'left' | 'right' | 'center'
}

const {
  // textAlign = 'center',
  loading,
  disabled,
  expand,
} = defineProps<Props>()
</script>

<template>
  <!-- <a v-if="href" :href :target v-bind="sharedBind">
    <slot />
  </a> -->

  <button
    class="vui-button"
    :class="{ loading, expand, disabled }"
    :disabled
  >
    <Spinner v-if="loading" size="s" />
    <div class="vui-button-slot">
      <slot />
    </div>
  </button>
</template>
