// Partial patterns allow in-progress typing, complete ones validate final values
export const REGEX_HEX = /^#[0-9A-F]{0,6}$/i
export const REGEX_HEX_COMPLETE = /^#(?:[0-9A-F]{3}|[0-9A-F]{6})$/i
export const REGEX_RGB_PARTIAL = /^r(g(b(\(\s*(\d{1,3}(\s*,\s*(\d{1,3}(\s*,\s*(\d{1,3}\s*\)?)?)?)?)?)?)?)?)?$/
export const REGEX_RGB_COMPLETE = /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/

/**
 * Converts HEX color to RGB. Supports both `#rgb` and `#rrggbb`.
 */
export function hexToRgb(hex: string): string {
  const full = toHex(hex)
  const r = Number.parseInt(full.slice(1, 3), 16)
  const g = Number.parseInt(full.slice(3, 5), 16)
  const b = Number.parseInt(full.slice(5, 7), 16)

  return `rgb(${r}, ${g}, ${b})`
}

/**
 * Converts RGB/HEX color to a 6 digit HEX
 */
export function toHex(value: string, defaultValue = '#000000'): string {
  if (!value)
    return defaultValue

  if (value.startsWith('#')) {
    if (/^#[0-9A-F]{6}$/i.test(value))
      return value.toLowerCase()

    // Expand shorthand #abc to #aabbcc
    if (/^#[0-9A-F]{3}$/i.test(value))
      return `#${value.slice(1).split('').map(char => char + char).join('')}`.toLowerCase()

    return defaultValue
  }

  const match = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)

  if (match) {
    return `#${[match[1], match[2], match[3]]
      .map(channel => Math.min(255, Number(channel)).toString(16).padStart(2, '0'))
      .join('')}`
  }

  return defaultValue
}

/**
 * Checks whether the value is a complete color in the given format
 */
export function isCompleteColor(value: string, format: 'hex' | 'rgb'): boolean {
  if (format === 'rgb') {
    if (!REGEX_RGB_COMPLETE.test(value))
      return false
    // Every channel must be within 0-255
    return (value.match(/\d+/g) ?? []).every(channel => Number(channel) <= 255)
  }

  return REGEX_HEX_COMPLETE.test(value)
}
