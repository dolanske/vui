import type { ComputedRef, Ref } from 'vue'
import { useColorMode, useMutationObserver, usePreferredDark } from '@vueuse/core'
import { computed, effectScope, ref } from 'vue'

export type VuiTheme = 'light' | 'dark' | 'auto'

type ColorMode = ReturnType<typeof useColorMode<VuiTheme>>

let colorMode: ColorMode | null = null

/**
 * Lazily initialises VueUse's color mode. Nothing runs at import time, so apps
 * which manage the theme themselves are never overridden. Until the theme API
 * is used, styling follows the system preference via CSS.
 */
function getColorMode(): ColorMode {
  if (!colorMode) {
    // Detached scope, the color mode is global and must outlive any component
    colorMode = effectScope(true).run(() => useColorMode<VuiTheme>({
      modes: {
        dark: 'dark',
        light: 'light',
        // TODO: add black theme
        // TODO: add high contrast light & dark theme
      },
      initialValue: 'auto',
    }))!
  }

  return colorMode
}

/**
 * The selected theme mode. Can be `auto`, use `resolvedTheme` or `isDark` to
 * know which theme is actually displayed.
 */
export const theme: ComputedRef<VuiTheme> = computed(() => getColorMode().value)

interface ThemeObserver {
  rootClass: Ref<string>
  prefersDark: Ref<boolean>
}

let observer: ThemeObserver | null = null

/**
 * Read-only observer of the root theme class and the system preference. It
 * never writes anything, so reading the resolved theme does not take over
 * theme management from the host app.
 */
function getObserver(): ThemeObserver {
  if (!observer) {
    observer = effectScope(true).run(() => {
      const rootClass = ref(document.documentElement.className)
      useMutationObserver(document.documentElement, () => {
        rootClass.value = document.documentElement.className
      }, { attributes: true, attributeFilter: ['class'] })

      return { rootClass, prefersDark: usePreferredDark() }
    })!
  }

  return observer
}

/**
 * The theme which is actually displayed. Uses the `light` / `dark` class on
 * the root element when present, otherwise the system preference.
 */
export const resolvedTheme: ComputedRef<'light' | 'dark'> = computed(() => {
  // Without a browser (SSR), the displayed theme is unknown
  if (typeof document === 'undefined')
    return 'light'

  const { rootClass, prefersDark } = getObserver()
  const classes = rootClass.value.split(/\s+/)

  if (classes.includes('dark'))
    return 'dark'
  if (classes.includes('light'))
    return 'light'
  return prefersDark.value ? 'dark' : 'light'
})

export const isDark: ComputedRef<boolean> = computed(() => resolvedTheme.value === 'dark')

export function setColorTheme(newTheme: VuiTheme): void {
  const mode = getColorMode()

  if (newTheme === mode.value)
    return

  mode.value = newTheme
}
