<script lang="ts">
import type { Sizes } from '../../shared/types'
import { computed, defineComponent, h } from 'vue'
import { isNil } from '../../shared/helpers'
import { Size } from '../../shared/types'
import Spinner from '../Spinner/Spinner.vue'
import './button.scss'

export type Variants = 'fill' | 'danger' | 'success' | 'link' | 'accent' | 'gray'

// There was an issue with swapping between <a> and <button> so in order to fix
// that, we omit Vue's template and use the h function to create the element

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
        case Size.l: return '44px'
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
            h('div', { class: 'vui-button-slot-start' }, slots?.start?.()),
            // Keep empty div even if slots aren't populated. This will force
            // start / end slots to be in their correct positions even if
            // default slot is not populated
            h('div', { class: 'vui-button-slot-default' }, slots.default?.()),
            h('div', { class: 'vui-button-slot-end' }, slots?.end?.()),
          ]),
        ],
      )
  },
})
</script>
