export interface KeyboardEventLike {
  altKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
  key: string
  code: string
  isComposing?: boolean 
}
