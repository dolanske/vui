export function removeColorPrefix(value: string): string {
  return value.replace(/^--(dark|light)-/, '--')
}

export function getContainerPercent(size: string) {
  // Take container size in pixels and calculate how big it is in percentage in
  // relation to 1920px screen
  return `${Math.round((Number(size.replace('px', '')) / 1920) * 100)}%`
}

export function normalizePath(path: string) {
  return path !== '/' ? path.replace(/\/+$/, '') : path
}
