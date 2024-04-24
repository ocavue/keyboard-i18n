import { isKeyboardEventLike } from './helpers'
import { wrapLocalizer } from './localize'
import type {
  KeyboardEventLike,
  KeyboardShortcut,
  Options,
  ParsedKeyboardShortcut,
} from './types'

/**
 * Returns a function that checks if an keyboard event matches the keyboard shortcut.
 */
export function createChecker<E extends KeyboardEventLike = KeyboardEvent>(
  /**
   * The keyboard shortcut to check.
   */
  shortcut: KeyboardShortcut,
  /**
   * Options for checking the keyboard shortcut.
   */
  options?: Options,
): (event: E) => boolean {
  const getLocalized = wrapLocalizer(shortcut, options)

  return function checker(event: E): boolean {
    if (!isKeyboardEventLike(event)) {
      return false
    }

    const localized = getLocalized()

    return eventMatches(event, localized)
  }
}

function eventMatches(
  event: KeyboardEventLike,
  shortcut: ParsedKeyboardShortcut,
) {
  // Don't handle keyboard events when IME is active
  if (event.isComposing) {
    return false
  }

  // When shift is pressed, `event.key` is uppercase, so we convert them to
  // lowercase before comparing
  const key = event.key.toLowerCase()
  const code = event.code.toLowerCase()
  const target = shortcut.target.toLowerCase()

  return (
    (key === target || code === target) &&
    event.altKey === shortcut.alt &&
    event.ctrlKey === shortcut.ctrl &&
    event.shiftKey === shortcut.shift &&
    event.metaKey === shortcut.meta
  )
}
