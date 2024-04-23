import { describe, it, expect } from 'vitest'

import { parseShortcut } from './parse'
import type { KeyboardShortcut } from './types'

function doParse(shortcut: KeyboardShortcut, isAppleOS?: boolean) {
  const parsed = parseShortcut(shortcut, { isAppleOS })
  return [
    parsed.alt && 'alt',
    parsed.ctrl && 'ctrl',
    parsed.meta && 'meta',
    parsed.shift && 'shift',
    parsed.target,
  ]
    .filter(Boolean)
    .join(' ')
}

describe('parseShortcut', () => {
  it('should parse shortcut', () => {
    expect(doParse('Escape')).toMatchInlineSnapshot(`"Escape"`)

    expect(doParse('shift+a')).toMatchInlineSnapshot(`"shift a"`)
    expect(doParse('alt+KeyA')).toMatchInlineSnapshot(`"alt KeyA"`)
  })

  it('should parse mod', () => {
    expect(doParse('mod+Slash')).toMatchInlineSnapshot(`"ctrl Slash"`)
    expect(doParse('mod+Slash', false)).toMatchInlineSnapshot(`"ctrl Slash"`)
    expect(doParse('mod+Slash', true)).toMatchInlineSnapshot(`"meta Slash"`)
  })
})
