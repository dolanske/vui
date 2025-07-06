export function removeColorPrefix(value: string): string {
  return value.replace('--dark', '--').replace('--light', '--')
}
