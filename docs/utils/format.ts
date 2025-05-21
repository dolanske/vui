export function removeColorPrefix(value: string) {
  return value.replace('--dark', '--').replace('--light', '--')
}
