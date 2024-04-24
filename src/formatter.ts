import type { KeyboardLayoutMap } from 'keyboard-layout-map'
import { US as USKeyboardLayoutMap } from 'keyboard-layout-map/layouts'

import { getLayout, isAppleOS } from './env'
import { wrapLocalizer } from './localize'
import type { KeyboardShortcut, Options, ParsedKeyboardShortcut } from './types'

/**
 * Returns a function that formats a keyboard shortcut as an array of strings.
 */
export function createFormatter(
  /**
   * The keyboard shortcut to format.
   */
  shortcut: KeyboardShortcut,
  /**
   * Options for formatting the keyboard shortcut.
   */
  options?: Options,
): () => string[] {
  const getLocalized = wrapLocalizer(shortcut, options)

  return function formatter(): string[] {
    const localized = getLocalized()
    const layout = options?.layout ?? getLayout() ?? USKeyboardLayoutMap
    const apple = options?.isAppleOS ?? isAppleOS

    return formatParsed(localized, layout, apple)
  }
}

/**
 * @internal
 */
export function formatParsed(
  parsed: ParsedKeyboardShortcut,
  layout: KeyboardLayoutMap,
  isAppleOS: boolean,
): string[] {
  const key = layout.get(parsed.target) ?? parsed.target

  return isAppleOS
    ? [
        // Use the order of Control -> Option -> Shift -> Command
        //
        // Reference: https://support.apple.com/en-us/HT201236
        parsed.ctrl ? 'Control' : '',
        parsed.alt ? 'Option' : '',
        parsed.shift ? 'Shift' : '',
        parsed.meta ? 'Command' : '',
        key,
      ].filter(Boolean)
    : [
        // Use the order of Win -> Ctrl -> Alt -> Shift
        //
        // Reference: https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec
        parsed.meta ? 'Win' : '',
        parsed.ctrl ? 'Ctrl' : '',
        parsed.alt ? 'Alt' : '',
        parsed.shift ? 'Shift' : '',
        key,
      ].filter(Boolean)
}
