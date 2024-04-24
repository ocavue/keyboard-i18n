import { getActiveElement, isHTMLElement } from '@zag-js/dom-query'

import { createChecker } from './checker'
import {
  type KeyboardEventLike,
  type KeyboardShortcut,
  type Options,
} from './types'

/**
 * Returns a keyboard event handler that can be used to handle keyboard shortcuts.
 */
export function createHandler<E extends KeyboardEventLike = KeyboardEvent>(
  /**
   * The keyboard shortcut to check.
   */
  shortcut: KeyboardShortcut | KeyboardShortcut[],

  /**
   * The callback function to run when the keyboard shortcut matches.
   */
  callback: (event: E) => void,

  /**
   * Options for checking the keyboard shortcut.
   */
  options?: Options,
): (event: E) => void {
  const shortcuts = Array.isArray(shortcut) ? shortcut : [shortcut]
  const checkers = shortcuts.map((shortcut) =>
    createChecker<E>(shortcut, options),
  )

  return function handler(event: E): void {
    for (const checker of checkers) {
      if (checker(event)) {
        // Blur the active element if the event is trigged by a dead key.
        // On Spanish keyboard layout, the keyboard shortcut `Command ´` is used
        // for going forward. However, `´` is a dead key, and it would insert a
        // `´` character in the content editable element. To avoid such text
        // inserting, we blur the active element if the event is trigged by a
        // dead key.
        if (event.key === 'Dead') {
          const target = (event as unknown as KeyboardEvent).target
          if (target && isHTMLElement(target)) {
            getActiveElement(target)?.blur()
          }
        }

        callback(event)
        return
      }
    }
  }
}
