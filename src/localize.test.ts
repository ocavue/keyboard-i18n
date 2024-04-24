import type { KeyboardLayoutMap } from 'keyboard-layout-map'
import * as layouts from 'keyboard-layout-map/layouts'
import { expect, test } from 'vitest'

import { formatParsed } from './formatter'
import { defaultLocalizer } from './localize'
import { parseShortcut } from './parse'
import type { KeyboardShortcut } from './types'

function localize(
  layout: KeyboardLayoutMap,
  shortcut: KeyboardShortcut,
): string {
  const parsed = parseShortcut(shortcut)
  const localized = defaultLocalizer(parsed, layout)
  return formatParsed(localized, layout, false).join(' ')
}

function localizeMany(
  layout: KeyboardLayoutMap,
  shortcuts: KeyboardShortcut[],
): Record<string, string> {
  return Object.fromEntries(
    shortcuts.map((shortcut) => [shortcut, localize(layout, shortcut)]),
  )
}

function localizeAll(shortcuts: KeyboardShortcut[]) {
  return Object.fromEntries(
    Object.entries(layouts).map(([name, layout]) => [
      name,
      localizeMany(layout, shortcuts),
    ]),
  )
}

test('localize', () => {
  const snapshot = localizeAll([
    'mod+,',
    'mod+BracketLeft',
    'mod+BracketRight',
    'mod+Slash',
  ])
  expect(snapshot).toMatchInlineSnapshot(`
    {
      "British": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl [",
        "mod+BracketRight": "Ctrl ]",
        "mod+Slash": "Ctrl /",
      },
      "Danish": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl æ",
        "mod+BracketRight": "Ctrl ø",
        "mod+Slash": "Ctrl å",
      },
      "Dvorak": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl [",
        "mod+BracketRight": "Ctrl ]",
        "mod+Slash": "Ctrl /",
      },
      "Finnish": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl ö",
        "mod+BracketRight": "Ctrl ä",
        "mod+Slash": "Ctrl å",
      },
      "French": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl ^",
        "mod+BracketRight": "Ctrl $",
        "mod+Slash": "Ctrl :",
      },
      "German": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl ö",
        "mod+BracketRight": "Ctrl ä",
        "mod+Slash": "Ctrl ß",
      },
      "Italian": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl ò",
        "mod+BracketRight": "Ctrl à",
        "mod+Slash": "Ctrl '",
      },
      "LatinAmerican": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl {",
        "mod+BracketRight": "Ctrl }",
        "mod+Slash": "Ctrl '",
      },
      "Norwegian": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl ø",
        "mod+BracketRight": "Ctrl æ",
        "mod+Slash": "Ctrl å",
      },
      "Portuguese": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl ç",
        "mod+BracketRight": "Ctrl ~",
        "mod+Slash": "Ctrl '",
      },
      "Slovak": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl ú",
        "mod+BracketRight": "Ctrl ä",
        "mod+Slash": "Ctrl ú",
      },
      "Spanish": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl ñ",
        "mod+BracketRight": "Ctrl ´",
        "mod+Slash": "Ctrl '",
      },
      "Swedish": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl ö",
        "mod+BracketRight": "Ctrl ä",
        "mod+Slash": "Ctrl å",
      },
      "SwissFrench": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl è",
        "mod+BracketRight": "Ctrl ¨",
        "mod+Slash": "Ctrl '",
      },
      "SwissGerman": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl ö",
        "mod+BracketRight": "Ctrl ä",
        "mod+Slash": "Ctrl '",
      },
      "US": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl [",
        "mod+BracketRight": "Ctrl ]",
        "mod+Slash": "Ctrl /",
      },
      "USInternational": {
        "mod+,": "Ctrl ,",
        "mod+BracketLeft": "Ctrl [",
        "mod+BracketRight": "Ctrl ]",
        "mod+Slash": "Ctrl /",
      },
    }
  `)
})
