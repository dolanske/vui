import type { InjectionKey, Ref } from 'vue'

export interface AccordionGroupEntry {
  value: Ref<string>
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
}

export interface AccordionGroupContext {
  /**
   * Registers an accordion with the group. Returns a function which
   * unregisters it.
   */
  register: (_entry: AccordionGroupEntry) => () => void
  /**
   * Called by an accordion whenever it opens or closes
   */
  onToggle: (_entry: AccordionGroupEntry) => void
}

export const ACCORDION_GROUP_KEY = Symbol('vui-accordion-group') as InjectionKey<AccordionGroupContext>
