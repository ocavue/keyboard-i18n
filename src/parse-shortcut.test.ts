import { describe, it, expect } from 'vitest'

import { parseShortcut } from './parse-shortcut'

describe('parseShortcut', () => {
  it('should parse shortcut', () => {
    expect(parseShortcut('Escape')).toMatchInlineSnapshot(`
      {
        "alt": false,
        "ctrl": false,
        "meta": false,
        "shift": false,
        "target": "Escape",
      }
    `)

    expect(parseShortcut('shift+a')).toMatchInlineSnapshot(`
      {
        "alt": false,
        "ctrl": false,
        "meta": false,
        "shift": true,
        "target": "a",
      }
    `)
  })

  it('should parse mod', () => {
    expect(parseShortcut('mod+Slash')).toMatchInlineSnapshot(`
      {
        "alt": false,
        "ctrl": true,
        "meta": false,
        "shift": false,
        "target": "Slash",
      }
    `)

    expect(parseShortcut('mod+Slash', { isAppleOS: false }))
      .toMatchInlineSnapshot(`
      {
        "alt": false,
        "ctrl": true,
        "meta": false,
        "shift": false,
        "target": "Slash",
      }
    `)

    expect(parseShortcut('mod+Slash', { isAppleOS: true }))
      .toMatchInlineSnapshot(`
      {
        "alt": false,
        "ctrl": false,
        "meta": true,
        "shift": false,
        "target": "Slash",
      }
    `)
  })
})
