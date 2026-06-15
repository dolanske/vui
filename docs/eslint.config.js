// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    css: true,
    html: true,
    markdown: true,
  },
}, {
  files: ['**/*.md'],
  rules: {
    'markdown/heading-increment': 'off',
  },
})
