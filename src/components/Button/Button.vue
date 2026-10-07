<script lang="ts">
import type { Component, PropType } from 'vue'
import type { Sizes } from '../../lib/types.ts'
import { computed, defineComponent, h, Transition } from 'vue'
import { Size } from '../../lib/types.ts'
import Spinner from '../Spinner/Spinner.vue'
import './button.scss'

export type Variants = 'fill' | 'danger' | 'success' | 'warning' | 'info' | 'link' | 'accent' | 'note' | 'gray'

// There was an issue with swapping between <a> and <button> so in order to fix
// that, we omit Vue's template and use the h function to create the element

export default defineComponent({
  name: 'VuiButton',
  props: {
    href: String,
    /**
     * Element or component to render, e.g. `RouterLink` or `NuxtLink`
     * together with a `to` attribute
     */
    as: [String, Object] as PropType<string | Component>,
    loading: Boolean,
    size: {
      type: String as PropType<Sizes>,
      default: 'm',
    },
    expand: Boolean,
    /**
     * Using square prop will hide the `start` and `end` slots
     */
    square: Boolean,
    variant: {
      type: String as PropType<Variants>,
      default: 'gray',
    },
    outline: Boolean,
    disabled: Boolean,
    plain: Boolean,
    /**
     * Native button type. Defaults to `button` so that buttons placed inside a
     * `<form>` do not submit it unless explicitly asked to with `type="submit"`.
     * Ignored when `href` is set.
     */
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button',
    },
  },
  setup(props, { slots }) {
    const height = computed(() => {
      switch (props.size) {
        case Size.s: return 'var(--interactive-el-height-s)'
        case Size.l: return 'var(--interactive-el-height-l)'
        case Size.m:
        default: return 'var(--interactive-el-height)'
      }
    })

    const padding = computed(() => {
      switch (props.size) {
        case Size.s: return '6px'
        case Size.l: return '16px'
        case Size.m:
        default: return '10px'
      }
    })

    const tag = computed(() => props.as ?? (props.href ? 'a' : 'button'))
    // Anything that is not a native button (anchors, router links) behaves like a link
    const isLink = computed(() => tag.value !== 'button')

    // Disabled and loading buttons must not react to clicks. Native disabled
    // buttons already swallow clicks, but anchors and loading buttons (which
    // stay focusable) need to be blocked manually. Capture phase ensures this
    // runs before any `@click` listener passed in by the consumer.
    function blockInteraction(event: Event) {
      if (props.loading || (props.disabled && isLink.value)) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
    }

    return () => {
      const isInactive = props.disabled || props.loading

      return h(
        tag.value as any,
        {
          'class': [
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
          'style': {
            '--vui-button-height': height.value,
            '--vui-button-padding': padding.value,
          },
          ...(isLink.value
            ? {
                // A disabled link must not be navigable or reachable via Tab
                // Only forward href when set, router link components compute their own
                ...(props.href !== undefined ? { href: props.disabled ? undefined : props.href } : {}),
                'role': props.disabled ? 'link' : undefined,
                'tabindex': props.disabled ? -1 : undefined,
                'aria-disabled': isInactive ? 'true' : undefined,
              }
            : {
                'type': props.type,
                // Loading buttons stay focusable (no `disabled` / `inert`) so
                // focus is not lost when an async action starts
                'disabled': props.disabled || undefined,
                'aria-disabled': props.loading ? 'true' : undefined,
              }),
          'aria-busy': props.loading ? 'true' : undefined,
          'onClickCapture': blockInteraction,
        },
        [
          h(Transition, { name: 'vui-button-spinner' }, () =>
            props.loading ? h(Spinner, { 'size': 's', 'aria-hidden': 'true' }) : null),
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
    }
  },
})
</script>
