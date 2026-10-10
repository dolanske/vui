import type { Sizes } from './types'

/**
 * CSS variable overrides used by all input-like components for the `size` prop
 */
export function getInputSizeStyle(size?: Sizes): Record<string, string> {
  switch (size) {
    case 's': return { '--vui-input-height': '28px', '--vui-input-padding': '4px' }
    case 'l': return { '--vui-input-height': '44px', '--vui-input-padding': '16px' }
    default: return {}
  }
}

/**
 * Splits component attributes so that `class` and `style` stay on the root
 * wrapper while everything else (name, autocomplete, aria-*, listeners, ...)
 * can be forwarded to the native form control.
 */
export function splitAttrs(attrs: Record<string, unknown>): {
  root: { class?: unknown, style?: unknown }
  control: Record<string, unknown>
} {
  const { class: className, style, ...control } = attrs
  return {
    root: { class: className, style },
    control,
  }
}

/**
 * Joins a list of element ids into an `aria-describedby` value, skipping empty
 * entries. Returns `undefined` when nothing is left so the attribute is omitted.
 */
export function joinIds(...ids: Array<string | false | null | undefined>): string | undefined {
  const result = ids.filter(Boolean).join(' ')
  return result.length > 0 ? result : undefined
}
