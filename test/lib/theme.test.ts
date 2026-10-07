import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

describe('theme', () => {
  it('has no side effects on import and only manages the theme when asked to', async () => {
    const { isDark, setColorTheme, theme, viewport, Size, SpaceSize } = await import('../../src/index')

    expect(document.documentElement.className).toBe('')
    expect(Object.keys(localStorage)).toEqual([])

    // Reading the resolved theme never takes over theme management
    expect(isDark.value).toBe(false)
    expect(document.documentElement.className).toBe('')

    // A host app managing the class itself is respected
    document.documentElement.classList.add('dark')
    await new Promise(resolve => setTimeout(resolve))
    expect(isDark.value).toBe(true)
    document.documentElement.classList.remove('dark')

    setColorTheme('light')
    await nextTick()
    expect(document.documentElement.className).toBe('light')
    expect(theme.value).toBe('light')

    expect(typeof viewport.s).toBe('boolean')
    expect(Size.s).toBe('s')
    expect(SpaceSize.xxxs).toBe('xxxs')
  })
})
