import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface RadioGroupContext {
  /**
   * Currently selected value of the group
   */
  model: Ref<unknown>
  /**
   * Shared native `name`, so the browser treats the radios as one group
   * (single tab stop, arrow key navigation)
   */
  name: ComputedRef<string>
  disabled: ComputedRef<boolean>
  required: ComputedRef<boolean>
}

export const RADIO_GROUP_KEY = Symbol('vui-radio-group') as InjectionKey<RadioGroupContext>
