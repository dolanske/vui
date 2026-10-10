import type { InjectionKey, Ref } from 'vue'

/**
 * Lets nested popouts (context menus, submenus, tooltips) report to the
 * popout they are rendered in whether they are open. They are teleported, so
 * this can not be read from the DOM.
 */
export const POPOUT_KEY: InjectionKey<{ openChildren: Ref<number> }> = Symbol('vui-popout')
