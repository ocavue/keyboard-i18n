/* eslint-disable deprecation/deprecation */

import { getKeyboardLayout, type KeyboardLayoutMap } from 'keyboard-layout-map'

import { layoutEquals } from './helpers'

export const isAppleOS =
  typeof window !== 'undefined' &&
  /Mac|iP(hone|[ao]d)/.test(window.navigator.platform)

let layout: KeyboardLayoutMap | null = null
let updatedAt = 0

/**
 * Get the current system keyboard layout.
 *
 * This function is synchronous but the browser keyboard layout API is
 * asynchronous. Thus this function could return outdated result in some rare
 * cases.
 *
 * @internal
 */
export function getLayout(): KeyboardLayoutMap | null {
  void updateLayout()
  return layout
}

async function updateLayout() {
  // A simple debounce to avoid updating the layout too often
  if (Date.now() - updatedAt < 3000) {
    return
  }

  updatedAt = Date.now()

  const newLayout = await getKeyboardLayout()

  // Chrome's API returns a different layout instance every time, so we need to
  // compare the layouts using our own function.
  if (!layoutEquals(layout, newLayout)) {
    layout = newLayout
  }
}
