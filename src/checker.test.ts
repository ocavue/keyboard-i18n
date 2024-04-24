import './env.mock'

import * as layouts from 'keyboard-layout-map/layouts'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { createChecker } from './checker'
import { setMockLayout } from './env.mock'

describe('createChecker', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('can check event', () => {
    const checker = createChecker('mod+a', { isAppleOS: false })

    const event1 = {
      key: 'a',
      code: 'KeyA',
      altKey: false,
      ctrlKey: true,
      metaKey: false,
      shiftKey: false,
    } as KeyboardEvent

    const event2 = {
      key: 'a',
      code: 'KeyA',
      altKey: true,
      ctrlKey: true,
      metaKey: false,
      shiftKey: false,
    } as KeyboardEvent

    const event3 = {
      key: 'b',
      code: 'KeyB',
      altKey: true,
      ctrlKey: true,
      metaKey: false,
      shiftKey: false,
    } as KeyboardEvent

    expect(checker(event1)).toBe(true)
    expect(checker(event2)).toBe(false)
    expect(checker(event3)).toBe(false)
  })

  it('can handle keyboard layout change', () => {
    const checkerA = createChecker('mod+a', { isAppleOS: false })
    const checkerKeyA = createChecker('mod+KeyA', { isAppleOS: false })

    const eventA = {
      key: 'a',
      code: 'KeyA',
      altKey: false,
      ctrlKey: true,
      metaKey: false,
      shiftKey: false,
    } as KeyboardEvent

    const eventQ = {
      key: 'q',
      code: 'KeyQ',
      altKey: false,
      ctrlKey: true,
      metaKey: false,
      shiftKey: false,
    } as KeyboardEvent

    const eventFrenchA = {
      key: 'q',
      code: 'KeyA',
      altKey: false,
      ctrlKey: true,
      metaKey: false,
      shiftKey: false,
    } as KeyboardEvent

    const eventFrenchQ = {
      key: 'a',
      code: 'KeyQ',
      altKey: false,
      ctrlKey: true,
      metaKey: false,
      shiftKey: false,
    } as KeyboardEvent

    expect(checkerA(eventA)).toBe(true)
    expect(checkerKeyA(eventA)).toBe(true)
    expect(checkerA(eventQ)).toBe(false)
    expect(checkerKeyA(eventQ)).toBe(false)

    setMockLayout(layouts.French)

    expect(checkerA(eventFrenchA)).toBe(false)
    expect(checkerKeyA(eventFrenchA)).toBe(true)
    expect(checkerA(eventFrenchQ)).toBe(true)
    expect(checkerKeyA(eventFrenchQ)).toBe(false)
  })
})
