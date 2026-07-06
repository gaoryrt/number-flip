import type { Flip } from '../number-flip'

export interface CaseContext {
  section: HTMLElement
  display: HTMLElement
  meta: HTMLElement
  getFlip: () => Flip | null
  setFlip: (flip: Flip | null) => void
}

export interface AssertResult {
  pass: boolean
  message: string
}

export interface TestCase {
  id: string
  purpose: string
  description: string
  autoAssert: boolean
  meta?: string
  setup: (ctx: CaseContext) => Flip | void
  actions?: Array<{
    id: string
    label: string
    run: (ctx: CaseContext, flip: Flip) => void | Promise<void>
    assertAfter?: boolean
  }>
  assert?: (ctx: CaseContext, flip: Flip) => Promise<AssertResult>
}
