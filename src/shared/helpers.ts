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
  return typeof value === 'number'
    ? `${value}${unit}`
  // If last value of string is NOT a number, do not add "px" at the end
  // eslint-disable-next-line unicorn/prefer-number-properties
    : isNaN(Number(value[value.length - 1]))
      ? value
      : `${value}${unit}`
}
