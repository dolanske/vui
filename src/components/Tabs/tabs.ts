import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface TabsContext {
  /**
   * Value of the currently active tab
   */
  active: Ref<string | undefined>
  /**
   * Whether the whole tab list is disabled
   */
  disabled: ComputedRef<boolean>
  /**
   * Id of the Tabs component. Set when panels are linked through `TabPanel`.
   */
  linkedId: ComputedRef<string | undefined>
  select: (_value: string) => void
  /**
   * Registers a tab so the list can react to tabs being added or removed.
   * Returns a function which unregisters it.
   */
  register: () => () => void
  /**
   * Tells the list that a tab changed its value
   */
  notify: () => void
}

export const TABS_KEY = Symbol('vui-tabs') as InjectionKey<TabsContext>

// Values can contain characters which are not allowed in ids
function toIdPart(value: string): string {
  return value.replace(/[^\w-]/g, '-')
}

export function getTabId(tabsId: string, value: string): string {
  return `${tabsId}-tab-${toIdPart(value)}`
}

export function getTabPanelId(tabsId: string, value: string): string {
  return `${tabsId}-panel-${toIdPart(value)}`
}
