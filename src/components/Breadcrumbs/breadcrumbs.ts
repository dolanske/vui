import type { InjectionKey, Ref, VNodeChild } from 'vue'

export interface BreadcrumbsContext {
  /**
   * Renders the separator placed after every item but the last
   */
  renderSeparator: () => VNodeChild
  /**
   * The last item element, used to automatically mark the current page
   */
  lastItem: Ref<Element | null>
}

export const BREADCRUMBS_KEY = Symbol('vui-breadcrumbs') as InjectionKey<BreadcrumbsContext>
