export enum Size {
  s = 's',
  m = 'm',
  l = 'l',
}

export type Sizes = 's' | 'm' | 'l'

export type DeepRequired<T> = { [K in keyof T]: DeepRequired<T[K]> } & Required<T>

export type VueClass = string | Record<string, | boolean> | Array<string | Record<string, string | boolean>>
