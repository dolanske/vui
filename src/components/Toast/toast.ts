// share some tiny global state

import { ref } from 'vue'

interface ToastAction {
  label: string
  handler: (toastId: number) => void
}

interface ToastOptions {
  persist?: boolean
  timeout?: number
  action?: ToastAction
  description?: string
}

interface Toast {
  id: number
  // type: ToastType
  title: string
  action?: ToastAction
  createdAt: number
  expiresAt: number
  description?: string
}

// type ToastType = 'error' | 'info' | 'success' | 'neutral' | 'warning'

// type NewToastFn = (title: string, options?: ToastOptions) => Toast

// Store in a ref so the toast component can import it
export const toasts = ref(new Map<number, Toast>())

// Simple incremental id system
let id = 0

// function toast(type: ToastType, title: string, options?: ToastOptions): Toast {
export function pushToast(title: string, options?: ToastOptions): Toast {
  const parsedOptions = Object.assign({
    persist: false,
    timeout: 7000,
  }, options)

  const newToast = {
    id,
    // type,
    title,
    persist: parsedOptions.persist,
    description: parsedOptions.description,
    action: parsedOptions.action,
    createdAt: Date.now(),
    expiresAt: Date.now() + parsedOptions.timeout,
  }

  toasts.value.set(id, newToast)

  // If options include timeout (by default) remove the toast after timeout
  // passes
  if (!parsedOptions.persist) {
    setTimeout((_id: number) => {
      toasts.value.delete(_id)
      // Pass Id as an optional argument, becasue by the time it is executed the
      // Id will have been increased
    }, parsedOptions.timeout, id)
  }

  id++

  return newToast
}

export function removeToast(id: number): void {
  toasts.value.delete(id)
}

//////

// export const toastError: NewToastFn = (title, options) => {
//   return pushToast('error', title, options)
// }

// export const toastSuccess: NewToastFn = (title, options) => {
//   return pushToast('success', title, options)
// }

// export const toastInfo: NewToastFn = (title, options) => {
//   return pushToast('info', title, options)
// }

// export const toastNeutral: NewToastFn = (title, options) => {
//   return pushToast('neutral', title, options)
// }

// export const toastWarning: NewToastFn = (title, options) => {
//   return pushToast('warning', title, options)
// }
