export function createArray(length: number, startOffset: number = 0): number[] {
  return Array
    .from({ length })
    .map((_, index) => startOffset + index)
}
