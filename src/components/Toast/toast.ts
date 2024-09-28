// share some tiny global state

import { ref } from 'vue'

interface ToastOptions {
  persistent?: boolean
  timeout?: number
}

interface Toast {
  id: number
  type: ToastType
  message: string
}

type ToastType = 'error' | 'info' | 'success' | 'neutral' | 'warning'

type NewToastFn = (message: string, options?: ToastOptions) => Toast

// Store in a ref so the toast component can import it
export const toasts = ref(new Map<number, Toast>())

// Simple incremental id system
let id = 0

function pushToast(type: ToastType, message: string, options?: ToastOptions): Toast {
  const parsedOptions = Object.assign({
    persist: false,
    timeout: 7000,
  }, options)

  const newToast = {
    id,
    type,
    message,
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

//////

export const toastError: NewToastFn = (message, options) => {
  return pushToast('error', message, options)
}

export const toastSuccess: NewToastFn = (message, options) => {
  return pushToast('success', message, options)
}

export const toastInfo: NewToastFn = (message, options) => {
  return pushToast('info', message, options)
}

export const toastNeutral: NewToastFn = (message, options) => {
  return pushToast('neutral', message, options)
}

export const toastWarning: NewToastFn = (message, options) => {
  return pushToast('warning', message, options)
}
