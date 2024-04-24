import { expect, describe, it, vi } from 'vitest'

import { createEventHandler } from './handler'

describe('createEventHandler', () => {
  it('should create a handler that can handle keyboard shortcuts', () => {
    const callback = vi.fn()
    const handler = createEventHandler('shift+a', callback)

    handler(
      new KeyboardEvent('keydown', {
        key: 'a',
        code: 'KeyA',
      }),
    )
    expect(callback).toHaveBeenCalledTimes(0)

    handler(
      new KeyboardEvent('keydown', {
        key: 'a',
        code: 'KeyA',
        shiftKey: true,
      }),
    )
    expect(callback).toHaveBeenCalledTimes(1)

    handler(
      new KeyboardEvent('keydown', {
        key: 'a',
        code: 'KeyA',
        ctrlKey: true,
        shiftKey: true,
      }),
    )
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
