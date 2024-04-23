/* eslint-disable deprecation/deprecation */

import { getKeyboardLayout, type KeyboardLayoutMap } from 'keyboard-layout-map'

export const isAppleOS =
  typeof window !== 'undefined' &&
  /Mac|iP(hone|[ao]d)/.test(window.navigator.platform)

let layout: KeyboardLayoutMap | null = null

export function getLayout(): KeyboardLayoutMap | null {
  return layout
}

export async function updateLayout() {
  layout = await getKeyboardLayout()
}
