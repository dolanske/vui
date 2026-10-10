import type { InjectionKey } from 'vue'

export interface KbdGroupContext {
  /**
   * Registers the keys of a child Kbd. Returns a function which unregisters it.
   */
  register: (_keys: () => string | undefined) => () => void
}

export const KBD_GROUP_KEY = Symbol('vui-kbd-group') as InjectionKey<KbdGroupContext>
