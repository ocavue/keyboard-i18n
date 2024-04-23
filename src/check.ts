import type { KeyboardLayoutMap } from 'keyboard-layout-map'

import { isKeyboardEventLike } from './helpers'
import { wrapLocalizer, type Localizer } from './localize'
import type { KeyboardEventLike } from './types'
import type { KeyboardShortcut, ParsedKeyboardShortcut } from './types'

/**
 * Returns a function that checks if an keyboard event matches the keyboard shortcut.
 */
export function check<E extends KeyboardEvent>(
  /**
   * The keyboard shortcut to check.
   */
  shortcut: KeyboardShortcut,
  /**
   * Options for checking the keyboard shortcut.
   */
  options?: {
    /**
     * Whether the current platform is Apple systems. It will be detected
     * automatically if not provided.
     */
    isAppleOS?: boolean
    /**
     * The keyboard layout to use. It will be detected automatically if not
     * provided.
     */
    layout?: KeyboardLayoutMap
    /**
     * The function to use for localizing the shortcut. Defaults to
     * {@link defaultLocalizer}
     */
    localizer?: Localizer
  },
): (event: E) => boolean {
  const getLocalized = wrapLocalizer(shortcut, options)

  return (event: E): boolean => {
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

  return (
    (key === shortcut.target || code === shortcut.target) &&
    event.altKey === shortcut.alt &&
    event.ctrlKey === shortcut.ctrl &&
    event.shiftKey === shortcut.shift &&
    event.metaKey === shortcut.meta
  )
}
