export function removeColorPrefix(value: string): string {
  return value.replace(/^--(dark|light)-/, '--')
}
