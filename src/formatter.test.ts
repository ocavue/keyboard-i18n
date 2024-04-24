import * as layouts from 'keyboard-layout-map/layouts'
import { describe, expect, it } from 'vitest'

import { createFormatter } from './formatter'
import type { KeyboardShortcut, Options } from './types'

function doFormat(shortcut: KeyboardShortcut, options?: Options) {
  return createFormatter(shortcut, options)().join(' ')
}

describe('createFormatter', () => {
  it('can format shortcuts', () => {
    expect(doFormat('Escape')).toMatchInlineSnapshot(`"Escape"`)

    expect(doFormat('shift+a')).toMatchInlineSnapshot(`"Shift a"`)
    expect(doFormat('alt+KeyA', { isAppleOS: true })).toMatchInlineSnapshot(
      `"Option a"`,
    )
  })

  it('can format mod on different platforms', () => {
    expect(doFormat('mod+Slash', { isAppleOS: true })).toMatchInlineSnapshot(
      `"Command /"`,
    )
    expect(doFormat('mod+Slash', { isAppleOS: false })).toMatchInlineSnapshot(
      `"Ctrl /"`,
    )
  })

  it('can format shortcuts with different layouts', () => {
    expect(
      doFormat('mod+BracketLeft', { layout: layouts.US }),
    ).toMatchInlineSnapshot(`"Ctrl ["`)
    expect(
      doFormat('mod+BracketLeft', { layout: layouts.German }),
    ).toMatchInlineSnapshot(`"Ctrl ö"`)
  })
})
