import type { KeyboardLayoutMap } from 'keyboard-layout-map'
import { US as USKeyboardLayoutMap } from 'keyboard-layout-map/layouts'

import { getLayout, isAppleOS } from './env'
import { wrapLocalizer, type Localizer } from './localize'
import type { KeyboardShortcut } from './types/shortcut'

/**
 * Returns a function that formats a keyboard shortcut as an array of strings.
 */
export function format(
  /**
   * The keyboard shortcut to format.
   */
  shortcut: KeyboardShortcut,
  /**
   * Options for formatting the keyboard shortcut.
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
): () => string[] {
  const getLocalized = wrapLocalizer(shortcut, options)

  return (): string[] => {
    const localized = getLocalized()

    const layout = options?.layout ?? getLayout() ?? USKeyboardLayoutMap
    const key = layout.get(localized.target) ?? localized.target
    const apple = options?.isAppleOS ?? isAppleOS

    return apple
      ? [
          // Use the order of Control -> Option -> Shift -> Command
          //
          // Reference: https://support.apple.com/en-us/HT201236
          localized.ctrl ? 'Control' : '',
          localized.alt ? 'Option' : '',
          localized.shift ? 'Shift' : '',
          localized.meta ? 'Command' : '',
          key,
        ].filter(Boolean)
      : [
          // Use the order of Win -> Ctrl -> Alt -> Shift
          //
          // Reference: https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec
          localized.meta ? 'Win' : '',
          localized.ctrl ? 'Ctrl' : '',
          localized.alt ? 'Alt' : '',
          localized.shift ? 'Shift' : '',
          key,
        ].filter(Boolean)
  }
}
