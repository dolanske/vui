import type { ComponentPublicInstance } from 'vue'

export enum Size {
  s = 's',
  m = 'm',
  l = 'l',
}

export type Sizes = 's' | 'm' | 'l'

export type DeepRequired<T> = { [K in keyof T]: DeepRequired<T[K]> } & Required<T>

export type VueClass = string | Record<string, | boolean> | Array<string | Record<string, string | boolean>>

// FLoating UI imported types were ruining the build so here we go
export type PopoutMaybeElement<T> = T | ComponentPublicInstance | null | undefined
export type Placement = 'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end'

export type Space = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'
export enum SpaceSize {
  xxs = 'xxs',
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
  xxl = 'xxl',
  xxxl = 'xxxl',
}
