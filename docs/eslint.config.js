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
}, {
  // CSS code blocks inside markdown are already formatted by `format/prettier`.
  // Running the JS stylistic rule on them too produces duplicate, conflicting fixes.
  files: ['**/*.md/**/*.css'],
  rules: {
    'style/no-multiple-empty-lines': 'off',
  },
})
