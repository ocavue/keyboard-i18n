import { isAppleOS } from './env'
import type { KeyboardEventCode } from './types'
import type { KeyboardEventKey } from './types'
import type {
  KeyboardModifier,
  KeyboardShortcut,
  ParsedKeyboardShortcut,
} from './types'

/**
 * Parses a keyboard shortcut string into a {@link ParsedKeyboardShortcut} object.
 */
export function parseShortcut(
  shortcut: KeyboardShortcut,
  options?: { isAppleOS?: boolean },
): ParsedKeyboardShortcut {
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

  if (modifiers.includes('shift') || target.startsWith('Shift')) {
    shift = true
  }
  if (modifiers.includes('ctrl') || target.startsWith('Control')) {
    ctrl = true
  }
  if (modifiers.includes('alt') || target.startsWith('Alt')) {
    alt = true
  }
  if (modifiers.includes('meta') || target.startsWith('Meta')) {
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
