/**
 * Some common event.code (KeyboardEvent.code) values that can be use in keyboard shortcuts.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values}
 */

export declare type KeyboardEventCode =
  | 'AltLeft'
  | 'AltRight'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'Backquote'
  | 'Backslash'
  | 'Backspace'
  | 'BracketLeft'
  | 'BracketRight'
  | 'CapsLock'
  | 'Comma'
  | 'ContextMenu'
  | 'ControlLeft'
  | 'ControlRight'
  | 'Delete'
  | 'Digit0'
  | 'Digit1'
  | 'Digit2'
  | 'Digit3'
  | 'Digit4'
  | 'Digit5'
  | 'Digit6'
  | 'Digit7'
  | 'Digit8'
  | 'Digit9'
  | 'End'
  | 'Enter'
  | 'Equal'
  | 'Escape'
  | 'F1'
  | 'F10'
  | 'F11'
  | 'F12'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'F7'
  | 'F8'
  | 'F9'
  | 'Home'
  | 'Insert'
  | 'IntlBackslash'
  | 'IntlRo'
  | 'IntlYen'
  | 'KeyA'
  | 'KeyB'
  | 'KeyC'
  | 'KeyD'
  | 'KeyE'
  | 'KeyF'
  | 'KeyG'
  | 'KeyH'
  | 'KeyI'
  | 'KeyJ'
  | 'KeyK'
  | 'KeyL'
  | 'KeyM'
  | 'KeyN'
  | 'KeyO'
  | 'KeyP'
  | 'KeyQ'
  | 'KeyR'
  | 'KeyS'
  | 'KeyT'
  | 'KeyU'
  | 'KeyV'
  | 'KeyW'
  | 'KeyX'
  | 'KeyY'
  | 'KeyZ'
  | 'MetaLeft'
  | 'MetaRight'
  | 'Minus'
  | 'PageDown'
  | 'PageUp'
  | 'Period'
  | 'Quote'
  | 'Semicolon'
  | 'ShiftLeft'
  | 'ShiftRight'
  | 'Slash'
  | 'Space'
  | 'Tab'

/**
 * Some common event.key (KeyboardEvent.key) values that can be use in keyboard shortcuts.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values}
 */
export declare type KeyboardEventKey =
  // Number keys
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  // Alphabetical keys
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  // Function keys
  | 'F1'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'F7'
  | 'F8'
  | 'F9'
  | 'F10'
  | 'F11'
  | 'F12'
  // Symbol keys
  | '!'
  | '@'
  | '#'
  | '$'
  | '%'
  | '^'
  | '&'
  | '*'
  | '('
  | ')'
  | '_'
  | '+'
  | '['
  | ']'
  | ':'
  | ';'
  | '<'
  | '>'
  | ','
  | '.'
  | '?'
  | '~'
  | '`'
  | '|'
  | '\\'
  | '/'
  | '='
  | '-'
  | "'"
  | '"'
  // Whitespace keys
  | 'Enter'
  | 'Tab'
  | ' '
  // Navigation keys
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'End'
  | 'Home'
  | 'PageDown'
  | 'PageUp'
  // Editing keys
  | 'Backspace'
  | 'Cut'
  | 'Delete'
  // UI keys
  | 'Escape'

export interface KeyboardEventLike {
  altKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
  key: string
  code: string
  isComposing?: boolean
}

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

/**
 * A object that represents a parsed keyboard shortcut based on current
 * platform.
 */
export interface ParsedKeyboardShortcut {
  target: KeyboardEventCode | KeyboardEventKey
  alt: boolean
  ctrl: boolean
  shift: boolean
  meta: boolean
}
