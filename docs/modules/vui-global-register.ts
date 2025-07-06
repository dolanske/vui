import * as vui from '@dolanske/vui'
import { addComponent, defineNuxtModule } from 'nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'vui-global-register',
    version: '0.0.1',
    configKey: 'vuiGlobalRegister',
  },
  setup(_, nuxt) {
    for (const name in vui) {
      // Ignore non-component exports
      if (name[0] !== name[0].toUpperCase())
        continue

      addComponent({
        name,
        export: name,
        filePath: '@dolanske/vui',
        global: true,
      })
    }

    nuxt.options.build.transpile.push('@dolanske/vui')
    // nuxt.options.css.push('@dolanske/vui/style')
  },
})
