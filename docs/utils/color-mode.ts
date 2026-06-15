// VueUse's default `useColorMode` storage key. The call sites rely on this
// default directly; it's named here only so the blocking color-mode script in
// `nuxt.config.ts` (which reimplements the read outside the composable) doesn't
// carry a bare magic string. Keep it equal to VueUse's default.
export const COLOR_MODE_STORAGE_KEY = 'vueuse-color-scheme'
