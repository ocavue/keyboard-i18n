import {
  identifyKeyboardLayout,
  type KeyboardLayoutMap,
} from 'keyboard-layout-map'

import type { KeyboardEventLike } from './types/event'

export function isKeyboardEventLike(
  event: unknown,
): event is KeyboardEventLike {
  return !!(
    event &&
    typeof event === 'object' &&
    'key' in event &&
    'code' in event &&
    'shiftKey' in event &&
    'altKey' in event &&
    'ctrlKey' in event &&
    'metaKey' in event &&
    typeof (event as KeyboardEventLike).key === 'string' &&
    typeof (event as KeyboardEventLike).code === 'string'
  )
}

export function layoutEquals(
  a: KeyboardLayoutMap | null,
  b: KeyboardLayoutMap | null,
) {
  if (a === b) {
    return true
  }
  if (a && b && identifyKeyboardLayout(a) === identifyKeyboardLayout(b)) {
    return true
  }
  return false
}
