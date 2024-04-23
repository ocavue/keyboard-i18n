import type { KeyboardLayoutMap } from 'keyboard-layout-map'
import { vi } from 'vitest'

let mockLayout: KeyboardLayoutMap | null = null

vi.mock('./env', async (importOriginal) => {
  const mod = await importOriginal<typeof import('./env')>()
  return {
    ...mod,
    getLayout: () => mockLayout,
  }
})

export function setMockLayout(layout: KeyboardLayoutMap | null) {
  mockLayout = layout
}
