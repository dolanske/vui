import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  rules: {
    'vue/max-len': 120,
  },
  formatters: {
    css: true,
    html: true,
  },
})
