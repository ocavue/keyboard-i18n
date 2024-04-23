import { isAppleOS } from './env'
import type { KeyboardEventCode } from './types/code'
import type { KeyboardEventKey } from './types/key'
import type { KeyboardModifier, KeyboardShortcut } from './types/shortcut'

export interface ParsedKeyboardShortcut {
  target: KeyboardEventCode | KeyboardEventKey
  alt: true
  ctrl: true
  shift: true
  meta: true
}

export function parseShortcut(
  shortcut: KeyboardShortcut,
  options?: { isAppleOS?: boolean },
) {
  const apple = options?.isAppleOS ?? isAppleOS

  let modifiers: KeyboardModifier[]
  let target: KeyboardEventCode | KeyboardEventKey
  let alt = false
  let ctrl = false
  let shift = false
  let meta = false

  if (shortcut.endsWith('++')) {
    modifiers = shortcut.slice(0, -2).split('+') as KeyboardModifier[]
    target = '+'
  } else {
    const parts = shortcut.split('+')
    target = parts.pop() as KeyboardEventCode | KeyboardEventKey
    modifiers = parts as KeyboardModifier[]
  }

  if (modifiers.includes('shift')) {
    shift = true
  }
  if (modifiers.includes('ctrl')) {
    ctrl = true
  }
  if (modifiers.includes('alt')) {
    alt = true
  }
  if (modifiers.includes('meta')) {
    meta = true
  }
  if (modifiers.includes('mod')) {
    if (apple) {
      meta = true
    } else {
      ctrl = true
    }
  }

  return { target, alt, ctrl, shift, meta }
}
