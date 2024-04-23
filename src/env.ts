export const isAppleOS =
  typeof window !== 'undefined' &&
  typeof window.navigator &&
  /Mac|iP(hone|[ao]d)/.test(window.navigator.platform)
