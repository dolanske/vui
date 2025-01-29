import { useColorMode } from '@vueuse/core'
import { readonly } from 'vue'

export type VuiTheme = 'light' | 'dark' | 'auto'

const themeImpl = useColorMode({
  modes: {
    dark: 'dark',
    light: 'light',
    // TODO: add more
  },
})

export const theme = readonly(themeImpl)

export function setColorTheme(newTheme: VuiTheme): void {
  if (newTheme === themeImpl.value)
    return

  themeImpl.value = newTheme
}
