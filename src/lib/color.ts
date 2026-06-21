export const REGEX_HEX = /^#[0-9A-F]{0,6}$/i
// export const REGEX_RGB = /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/
export const REGEX_RGB_PARTIAL = /^r(g(b(\(\s*(\d{1,3}(\s*,\s*(\d{1,3}(\s*,\s*(\d{1,3}\s*\)?)?)?)?)?)?)?)?)?$/

/**
 * Converts HEX color to RGB
 */
export function hexToRgb(hex: string): string {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)

  return `rgb(${r}, ${g}, ${b})`
}

/**
 * Converts RGB/HEX color to HEX
 */
export function toHex(value: string, defaultValue = '#000000'): string {
  if (!value)
    return defaultValue

  if (value.startsWith('#'))
    return value.length === 7 ? value : defaultValue

  const match = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)

  if (match) {
    return `#${Number(match[1]).toString(16).padStart(2, '0')}${Number(match[2]).toString(16).padStart(2, '0')}${Number(match[3]).toString(16).padStart(2, '0')}`
  }

  return defaultValue
}
