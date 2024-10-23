export function createArray(length: number, startOffset: number = 0): number[] {
  return Array
    .from({ length })
    .map((_, index) => startOffset + index)
}

// Searches through the input and checkes wether it contains match
// It searches the input by splitting it by whitespace and matching each
// word against the string
export function searchInStr(match: string | string[], input: string): boolean {
  if (!match)
    return false

  const joint: string = Array.isArray(match) ? match.join(' ') : match

  const split = input.trim().split(/\s+/)
  return split.every(s => joint.toLowerCase().includes(s.toLowerCase()))
}

// Calculate pagination
