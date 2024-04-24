import {
  identifyKeyboardLayout,
  type KeyboardLayoutMap,
} from 'keyboard-layout-map'

import { getLayout } from './env'
import { parseShortcut } from './parse'
import type {
  KeyboardEventCode,
  KeyboardEventKey,
  KeyboardShortcut,
  Localizer,
  Options,
  ParsedKeyboardShortcut,
} from './types'

/**
 * The default localizer.
 */
export const defaultLocalizer: Localizer = (shortcut, layout) => {
  const layoutName = identifyKeyboardLayout(layout)
  const target = localizeTarget(shortcut.target, layoutName) ?? shortcut.target
  return { ...shortcut, target }
}

type KeyboardLayoutName = ReturnType<typeof identifyKeyboardLayout>

function localizeTarget(
  target: KeyboardEventCode | KeyboardEventKey,
  layout: KeyboardLayoutName,
): KeyboardEventCode | KeyboardEventKey | null {
  switch (target) {
    case 'BracketLeft':
      switch (layout) {
        case 'Spanish':
        case 'Italian':
        case 'German':
        case 'SwissGerman':
        case 'Finnish':
        case 'Portuguese':
        case 'Norwegian':
        case 'Danish':
          return 'Semicolon'
        case 'LatinAmerican':
          return 'Quote'
        case 'Dvorak':
          return '['
      }
      break
    case 'BracketRight':
      switch (layout) {
        case 'Spanish':
        case 'Italian':
        case 'German':
        case 'SwissGerman':
        case 'Finnish':
        case 'Portuguese':
        case 'Norwegian':
        case 'Danish':
          return 'Quote'
        case 'LatinAmerican':
          return 'Backslash'
        case 'Dvorak':
          return ']'
      }
      break
    case 'Slash':
      switch (layout) {
        case 'French':
          return 'Period'
        case 'Portuguese':
        case 'German':
        case 'SwissGerman':
        case 'SwissFrench':
        case 'Italian':
        case 'LatinAmerican':
        case 'Spanish':
          return 'Minus'
        case 'Finnish':
        case 'Danish':
        case 'Norwegian':
        case 'Slovak':
          return 'BracketLeft'
        case 'Dvorak':
          return '/'
      }
      break
  }

  return null
}

/**
 * @internal
 */
export function wrapLocalizer(
  shortcut: KeyboardShortcut,
  options?: Options,
): () => ParsedKeyboardShortcut {
  const localizer = options?.localizer || defaultLocalizer

  const parsed: ParsedKeyboardShortcut = parseShortcut(shortcut, {
    isAppleOS: options?.isAppleOS,
  })

  // Refresh the cached layout
  getLayout()

  let layout: KeyboardLayoutMap | null = null 
  let localized: ParsedKeyboardShortcut = parsed

  return () => {
    const currentLayout = options?.layout || getLayout()

    if (currentLayout !== layout) {
      layout = currentLayout
      localized = layout ? localizer(parsed, layout) : parsed
    }

    return localized
  }
}
