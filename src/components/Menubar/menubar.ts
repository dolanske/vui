import type { InjectionKey, Ref } from 'vue'

export interface MenubarContext {
  /**
   * Id of the item whose menu is open, `null` when every menu is closed
   */
  openId: Ref<string | null>
  /**
   * Id of the item which is reachable with Tab (roving tabindex)
   */
  activeId: Ref<string | null>
  register: (_id: string) => () => void
  open: (_id: string) => void
  close: () => void
}

export const MENUBAR_KEY = Symbol('vui-menubar') as InjectionKey<MenubarContext>

export const MENUBAR_TRIGGER_ATTR = 'data-vui-menubar-trigger'
