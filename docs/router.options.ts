import type { RouterConfig } from '@nuxt/schema'

export default {
  scrollBehavior: () => {
    return { left: 0, top: 0 }
  },
} satisfies RouterConfig
