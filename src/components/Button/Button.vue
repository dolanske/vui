<script lang="ts">
import type { Sizes } from '../../shared/types'
import { computed, defineComponent, h } from 'vue'
import { isNil } from '../../shared/helpers'
import { Size } from '../../shared/types'
import Spinner from '../Spinner/Spinner.vue'

export type Variants = 'fill' | 'danger' | 'success' | 'link' | 'accent' | 'gray'

export default defineComponent({
  name: 'VuiButton',
  props: {
    href: String,
    loading: Boolean,
    size: {
      type: String as () => Sizes,
      default: 'm',
    },
    expand: Boolean,
    square: Boolean,
    variant: {
      type: String as () => Variants,
      default: 'gray',
    },
    outline: Boolean,
    disabled: Boolean,
    plain: Boolean,
  },
  setup(props, { slots }) {
    const height = computed(() => {
      switch (props.size) {
        case Size.s: return '28px'
        case Size.l: return '42px'
        case Size.m:
        default: return 'var(--interactive-el-height)'
      }
    })

    const padding = computed(() => {
      switch (props.size) {
        case Size.s: return '4px'
        case Size.l: return '18px'
        case Size.m:
        default: return '10px'
      }
    })

    return () =>
      h(
        props.href ? 'a' : 'button',
        {
          class: [
            'vui-button',
            {
              loading: props.loading,
              expand: props.expand,
              disabled: props.disabled,
              plain: props.plain,
              square: props.square,
              outline: props.outline,
            },
            `vui-button-variant-${props.variant}`,
            `vui-button-size-${props.size}`,
          ],
          disabled: props.disabled,
          href: props.href,
          role: 'button',
          style: {
            '--button-height': height.value,
            '--button-padding': padding.value,
          },
        },
        [
          !isNil(props.loading) ? h(Spinner, { size: 's' }) : null,
          h('div', { class: 'vui-button-slot' }, [
            slots.start?.() ? h('div', { class: 'vui-button-slot-start' }, slots.start()) : null,
            slots.default?.(),
            slots.end?.() ? h('div', { class: 'vui-button-slot-end' }, slots.end()) : null,
          ]),
        ],
      )
  },
})
</script>
