const MODIFIER_ALIASES: Record<string, 'ctrl' | 'meta' | 'alt' | 'shift'> = {
  ctrl: 'ctrl',
  control: 'ctrl',
  meta: 'meta',
  cmd: 'meta',
  command: 'meta',
  super: 'meta',
  win: 'meta',
  alt: 'alt',
  option: 'alt',
  opt: 'alt',
  shift: 'shift',
}

const KEY_ALIASES: Record<string, string> = {
  esc: 'escape',
  space: ' ',
  spacebar: ' ',
  up: 'arrowup',
  down: 'arrowdown',
  left: 'arrowleft',
  right: 'arrowright',
  del: 'delete',
  return: 'enter',
}

export interface ParsedShortcut {
  ctrl: boolean
  meta: boolean
  alt: boolean
  shift: boolean
  /**
   * The non-modifier key, lowercase. `null` for modifier-only shortcuts.
   */
  key: string | null
}

/**
 * Parses shortcuts such as `Ctrl+K`, `Shift+Enter` or `Cmd+Shift+P`
 */
export function parseShortcut(shortcut: string): ParsedShortcut {
  const parsed: ParsedShortcut = { ctrl: false, meta: false, alt: false, shift: false, key: null }

  for (const raw of shortcut.split('+')) {
    const part = raw.trim().toLowerCase()
    if (!part)
      continue

    const modifier = MODIFIER_ALIASES[part]
    if (modifier)
      parsed[modifier] = true
    else
      parsed.key = KEY_ALIASES[part] ?? part
  }

  return parsed
}

export function hasModifier(shortcut: ParsedShortcut): boolean {
  return shortcut.ctrl || shortcut.meta || shortcut.alt
}

/**
 * Whether a keyboard event matches a shortcut exactly. Extra modifiers make
 * the shortcut not match, so `K` does not fire on `Ctrl+K`.
 */
export function matchesShortcut(event: KeyboardEvent, shortcut: string | ParsedShortcut): boolean {
  const parsed = typeof shortcut === 'string' ? parseShortcut(shortcut) : shortcut

  if (event.ctrlKey !== parsed.ctrl || event.metaKey !== parsed.meta || event.altKey !== parsed.alt)
    return false

  // Shift changes the produced character (e.g. `?`), only enforce it when it
  // was explicitly part of the shortcut
  if (parsed.shift && !event.shiftKey)
    return false

  if (parsed.key === null)
    return true

  const key = event.key.toLowerCase()
  // `event.code` covers layouts where Alt / Option changes the produced character
  const code = event.code.toLowerCase().replace(/^key|^digit/, '')
  return key === parsed.key || code === parsed.key
}

/**
 * Whether the event target is a text field, where single key shortcuts must
 * not fire while the user is typing
 */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement))
    return false
  if (target.isContentEditable)
    return true
  if (target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')
    return true
  if (target.tagName === 'INPUT') {
    const type = (target as HTMLInputElement).type
    return !['checkbox', 'radio', 'button', 'submit', 'reset', 'range', 'color', 'file'].includes(type)
  }
  return false
}

export function isMacPlatform(): boolean {
  if (typeof navigator === 'undefined')
    return false
  const platform = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ?? navigator.platform ?? ''
  return /mac|iphone|ipad|ipod/i.test(platform)
}

const MAC_SYMBOLS: Record<string, string> = {
  ctrl: '⌃',
  control: '⌃',
  meta: '⌘',
  cmd: '⌘',
  command: '⌘',
  alt: '⌥',
  option: '⌥',
  shift: '⇧',
  enter: '↵',
  escape: 'Esc',
  esc: 'Esc',
}

/**
 * Formats a single key for display. On macOS, modifier keys use their
 * symbols, `Meta` becomes `⌘`.
 */
export function formatKey(key: string, mac = isMacPlatform()): string {
  const lower = key.toLowerCase()
  if (mac && MAC_SYMBOLS[lower])
    return MAC_SYMBOLS[lower]
  return key.length === 1 ? key.toUpperCase() : key
}
