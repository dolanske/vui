import type { Component } from 'vue'
import { markRaw, ref } from 'vue'

export type ToastVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

interface ToastAction {
  label: string
  handler: (_toastId: number) => void
  /**
   * Keep the toast open after the action was clicked. By default the toast
   * is dismissed.
   */
  keepOpen?: boolean
}

export interface ToastOptions {
  persist?: boolean
  timeout?: number
  action?: ToastAction
  description?: string
  body?: Component
  bodyProps?: object
  /**
   * Color and icon of the toast. `danger` toasts are announced assertively.
   */
  variant?: ToastVariant
  /**
   * Shows a close button. Enabled by default.
   */
  dismissible?: boolean
}

export interface Toast {
  id: number
  title: string
  action?: ToastAction
  createdAt: number
  expiresAt: number
  description?: string
  body?: Component
  bodyProps?: object
  variant: ToastVariant
  dismissible: boolean
  persist: boolean
  timeout: number
}

// Store in a ref so the toast component can import it
export const toasts = ref(new Map<number, Toast>())

// Simple incremental id system
let id = 0

interface Timer {
  handle: ReturnType<typeof setTimeout> | undefined
  remaining: number
  startedAt: number
}

const timers = new Map<number, Timer>()
let paused = false

function startTimer(toastId: number, duration: number): void {
  clearTimer(toastId)
  const timer: Timer = { handle: undefined, remaining: duration, startedAt: Date.now() }
  timers.set(toastId, timer)

  if (!paused)
    timer.handle = setTimeout(removeToast, duration, toastId)
}

function clearTimer(toastId: number): void {
  const timer = timers.get(toastId)
  if (timer)
    clearTimeout(timer.handle)
  timers.delete(toastId)
}

export function pushToast(title: string, options?: ToastOptions): Toast {
  const parsedOptions = {
    persist: false,
    timeout: 7000,
    dismissible: true,
    variant: 'neutral' as ToastVariant,
    ...options,
  }

  const toastId = id++

  const newToast: Toast = {
    id: toastId,
    title,
    persist: parsedOptions.persist,
    timeout: parsedOptions.timeout,
    description: parsedOptions.description,
    action: parsedOptions.action,
    createdAt: Date.now(),
    expiresAt: Date.now() + parsedOptions.timeout,
    // Components must not become reactive
    body: parsedOptions.body ? markRaw(parsedOptions.body) : undefined,
    bodyProps: parsedOptions.bodyProps ?? {},
    variant: parsedOptions.variant,
    dismissible: parsedOptions.dismissible,
  }

  toasts.value.set(toastId, newToast)

  // If options include timeout (by default) remove the toast after timeout
  // passes
  if (!parsedOptions.persist)
    startTimer(toastId, parsedOptions.timeout)

  return newToast
}

/**
 * Updates an existing toast, e.g. to turn a "Saving…" toast into "Saved".
 * Passing `timeout` or `persist` restarts / stops the auto dismiss timer.
 */
export function updateToast(toastId: number, changes: Partial<Omit<ToastOptions, 'body'>> & { title?: string, body?: Component }): Toast | undefined {
  const current = toasts.value.get(toastId)
  if (!current)
    return undefined

  const updated: Toast = {
    ...current,
    ...changes,
    body: changes.body ? markRaw(changes.body) : current.body,
    title: changes.title ?? current.title,
    persist: changes.persist ?? current.persist,
    timeout: changes.timeout ?? current.timeout,
  } as Toast

  toasts.value.set(toastId, updated)

  if (changes.persist === true) {
    clearTimer(toastId)
  }
  else if (changes.persist === false || changes.timeout !== undefined) {
    updated.expiresAt = Date.now() + updated.timeout
    startTimer(toastId, updated.timeout)
  }

  return updated
}

export function removeToast(toastId: number): void {
  clearTimer(toastId)
  toasts.value.delete(toastId)
}

/**
 * Pauses every auto dismiss timer, used while the user hovers or focuses the
 * toasts (WCAG 2.2.1 Timing Adjustable)
 */
export function pauseToasts(): void {
  if (paused)
    return
  paused = true

  for (const timer of timers.values()) {
    clearTimeout(timer.handle)
    timer.handle = undefined
    timer.remaining = Math.max(0, timer.remaining - (Date.now() - timer.startedAt))
  }
}

export function resumeToasts(): void {
  if (!paused)
    return
  paused = false

  for (const [toastId, timer] of timers) {
    timer.startedAt = Date.now()
    timer.handle = setTimeout(removeToast, timer.remaining, toastId)
  }
}
