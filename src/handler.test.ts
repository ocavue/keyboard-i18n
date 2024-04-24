import { expect, describe, it, vi } from 'vitest'

import { createHandler } from './handler'

describe('createHandler', () => {
  it('should create a handler that can handle keyboard shortcuts', () => {
    const callback = vi.fn()
    const handler = createHandler('shift+a', callback)

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
