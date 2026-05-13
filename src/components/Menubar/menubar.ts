import type { Ref } from 'vue'

export interface MenubarContext {
  openIndex: Ref<number | null>
  register: () => number
  open: (index: number) => void
  close: () => void
}

export const MENUBAR_KEY = Symbol('menubar')
