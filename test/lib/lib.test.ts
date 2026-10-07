import { describe, expect, it } from 'vitest'
import { paginate } from '../../src/components/Pagination/pagination'
import { toHex } from '../../src/lib/color'
import { formatUnitValue, searchString } from '../../src/lib/helpers'
import { matchesShortcut, parseShortcut } from '../../src/lib/keys'

describe('formatUnitValue', () => {
  it('only adds a unit to plain numbers', () => {
    expect(formatUnitValue(10)).toBe('10px')
    expect(formatUnitValue('10')).toBe('10px')
    expect(formatUnitValue('-4')).toBe('-4px')
    expect(formatUnitValue('.5')).toBe('.5px')
    for (const value of ['auto', 'calc(1px + 2px)', '1fr', '-4px', '50%', 'var(--x)'])
      expect(formatUnitValue(value)).toBe(value)
  })
})

describe('searchString', () => {
  it('matches every word and accepts 0', () => {
    expect(searchString('Hello World', 'world hello')).toBe(true)
    expect(searchString('Hello World', 'hello foo')).toBe(false)
    expect(searchString(0, '0')).toBe(true)
    expect(searchString(['a', null, 'b'], 'b')).toBe(true)
  })
})

describe('toHex', () => {
  it('expands shorthand hex and converts rgb', () => {
    expect(toHex('#fff')).toBe('#ffffff')
    expect(toHex('rgb(255, 0, 16)')).toBe('#ff0010')
    expect(toHex('#ff', '#000000')).toBe('#000000')
  })
})

describe('paginate', () => {
  it('describes the data bounds, not only the visible window', () => {
    const pagination = paginate(100, 2, 10, 2)
    expect(pagination.totalPages).toBe(10)
    expect(pagination.currentPage < pagination.totalPages).toBe(true)
  })

  it('is safe for empty and invalid input', () => {
    const empty = paginate(0, 1, 10, 3)
    expect(empty.currentPage).toBe(1)
    expect(empty.totalPages).toBe(1)
    expect(empty.startIndex).toBe(0)

    const invalid = paginate(10, 99, 0, 0)
    expect(invalid.perPage).toBe(1)
    expect(invalid.currentPage).toBe(10)
  })
})

describe('shortcuts', () => {
  it('matches modifiers exactly', () => {
    const shortcut = parseShortcut('Ctrl+K')
    expect(matchesShortcut(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }), shortcut)).toBe(true)
    expect(matchesShortcut(new KeyboardEvent('keydown', { key: 'k' }), shortcut)).toBe(false)
    expect(matchesShortcut(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, altKey: true }), shortcut)).toBe(false)
    expect(matchesShortcut(new KeyboardEvent('keydown', { key: 'Escape' }), 'Esc')).toBe(true)
  })
})
