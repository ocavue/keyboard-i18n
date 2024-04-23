import type { KeyboardEventCode } from './code'
import type { KeyboardEventKey } from './key'

/**
 * Key modifiers for a keyboard shortcut.
 *
 * - "mod": Command on macOS and Ctrl on Windows
 * - "ctrl": Control on macOS and Ctrl on Windows
 * - "alt": Option on macOS and Alt on Windows
 * - "meta": Command on macOS and Win on Windows
 * - "shift": Shift
 */
export type KeyboardModifier = 'mod' | 'ctrl' | 'alt' | 'meta' | 'shift'

type KeyboardShortcutPrefix =
  | ''
  | `${KeyboardModifier}+`
  | `${KeyboardModifier}+${KeyboardModifier}+`
  | `${KeyboardModifier}+${KeyboardModifier}+${KeyboardModifier}+`

/**
 * A string that represents a keyboard shortcut.
 *
 * Examples:
 *
 * - "Escape"
 * - "ctrl+a"
 * - "mod+shift+Slash"
 * - "alt+KeyA"
 * - "shift+ArrowUp"
 */
export type KeyboardShortcut =
  | `${KeyboardShortcutPrefix}${KeyboardEventKey}`
  | `${KeyboardShortcutPrefix}${KeyboardEventCode}`
