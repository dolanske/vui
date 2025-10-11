import type { Placement } from '@floating-ui/vue'

export function createArray(length: number, startOffset: number = 0): number[] {
  return Array
    .from({ length })
    .map((_, index) => startOffset + index)
}

// Searches through the input and checkes wether it contains match
// It searches the input by splitting it by whitespace and matching each
// word against the string
export function searchString(match: string | string[], input: string): boolean {
  if (!match)
    return false

  const joint: string = Array.isArray(match) ? match.join(' ') : match

  const split = input.trim().split(/\s+/)
  return split.every(s => joint.toLowerCase().includes(s.toLowerCase()))
}

export function getMaybeRefLength(value: string | number): number {
  return typeof value === 'number' ? value : value.length
}

export function isNil(value: any): value is undefined | null {
  return value === undefined || value === null
}

/**
 * Checks wether a color is light or dark, depending on
 */
export function calculateColorLightness(r: number, g: number, b: number): 'dark' | 'light' {
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? 'light' : 'dark'
}

/**
 * Convert a CSS rgb string to a tuple of actual r,g,b values
 *
 * 'rgb(12,16,24)' --> [12, 16, 24]
 */
export function stringRgbToValues(rgbString: string): [number, number, number] {
  return rgbString.match(/\d+/g)!.map(Number) as any as [number, number, number]
}

// export function rgbToHex(r: number, g: number, b: number): string {
//   return `#${[r, g, b].map((x) => {
//     const hex = x.toString(16)
//     return hex.length === 1 ? `0${hex}` : hex
//   }).join('')}`
// }

export function randomMinMax(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function delay(amount: number): Promise<any> {
  return new Promise(r => setTimeout(r, amount))
}

export function setCharAt(str: string, char: string | number, index: number): string {
  if (str.length === 0)
    return char.toString()
  return str.substring(0, index) + char + str.substring(index + 1)
}

/**
 * Takes in a value and if it is a number, appends "px" to it, otherwise returns
 * the original value.
 *
 */
export function formatUnitValue(value: string | number, unit: string = 'px'): string {
  if (typeof value === 'number') {
    return `${value}${unit}`
  }

  // Check if the string ends with a known unit (e.g., px, em, rem, %, vh, etc.)
  const hasUnit = /[a-z%]+$/i.test(value.trim())

  return hasUnit ? value.trim() : `${value.trim()}${unit}`
}

export function clamp(min: number, max: number, value: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Checks wether an object is inside of Set, based on comparing values. Not reference
 *
 * @param set The Set
 * @param obj Object which should be in the side
 * @returns If object is inside the set
 */
export function isObjectInSet(set: Set<any>, obj: any): boolean {
  for (const item of set) {
    // Check if both have the same number of keys
    if (Object.keys(item).length !== Object.keys(obj).length) {
      continue
    }

    // Compare each key-value pair
    let isEqual = true

    for (const key in item) {
      if (key in item && item[key] !== obj[key]) {
        isEqual = false
        break
      }
    }

    if (isEqual) {
      return true
    }
  }

  return false
}

export function getPlacementAnimationName(position: Placement): string {
  const suffix = position.includes('-') ? position.split('-')[0] : position
  return `fade-${suffix}`
}
