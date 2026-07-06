import type { Flip } from '../number-flip'
import { setStatus } from './assert'
import { cases } from './cases'
import { renderCase, renderNav } from './render'
import type { CaseContext, TestCase } from './types'
import './styles.css'

const flipMap = new Map<string, Flip | null>()

function snapshotFlipPrev(ctx: CaseContext, flip: Flip) {
  ctx.section.dataset.flipPrev = String(flip.from)
}

async function runAssert(testCase: TestCase, ctx: CaseContext) {
  if (!testCase.autoAssert || !testCase.assert) return
  const flip = ctx.getFlip()
  if (!flip) {
    setStatus(ctx.section, 'fail', 'fail：无 Flip 实例')
    return
  }
  setStatus(ctx.section, 'pending', '断言中…')
  try {
    const result = await testCase.assert(ctx, flip)
    setStatus(
      ctx.section,
      result.pass ? 'pass' : 'fail',
      result.message,
    )
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    setStatus(ctx.section, 'fail', `fail：${msg}`)
  }
}

function buildContext(section: HTMLElement, testCase: TestCase): CaseContext {
  const display = section.querySelector<HTMLElement>(
    `[data-testid="case-${testCase.id}-display"]`,
  )!
  const meta = section.querySelector<HTMLElement>(
    `[data-testid="case-${testCase.id}-meta"]`,
  )!
  const ctx: CaseContext = {
    section,
    display,
    meta,
    getFlip: () => flipMap.get(testCase.id) ?? null,
    setFlip: (flip) => {
      flipMap.set(testCase.id, flip)
    },
  }
  return ctx
}

function wireFlipBack(testCase: TestCase, ctx: CaseContext) {
  const btn = ctx.section.querySelector<HTMLButtonElement>(
    `[data-testid="case-${testCase.id}-btn-flip-back"]`,
  )
  if (!btn) return
  btn.addEventListener('click', async () => {
    const flip = ctx.getFlip()
    if (!flip) return
    const prev = Number(ctx.section.dataset.flipPrev)
    if (Number.isNaN(prev)) return
    snapshotFlipPrev(ctx, flip)
    flip.flipTo({ to: prev })
    if (testCase.autoAssert) await runAssert(testCase, ctx)
  })
}

function wireCase(testCase: TestCase, section: HTMLElement) {
  const ctx = buildContext(section, testCase)
  const flip = testCase.setup(ctx)
  if (flip) {
    ctx.setFlip(flip)
    snapshotFlipPrev(ctx, flip)
  }

  wireFlipBack(testCase, ctx)

  if (testCase.autoAssert) {
    void runAssert(testCase, ctx)
  }

  for (const action of testCase.actions ?? []) {
    const btn = section.querySelector<HTMLButtonElement>(
      `[data-testid="case-${testCase.id}-btn-${action.id}"]`,
    )
    if (!btn) continue
    btn.addEventListener('click', async () => {
      const current = ctx.getFlip()
      if (!current) return
      snapshotFlipPrev(ctx, current)
      await action.run(ctx, current)
      if (action.id === 'destroy') ctx.setFlip(null)
      if (action.assertAfter && testCase.autoAssert) {
        await runAssert(testCase, ctx)
      }
    })
  }
}

const root = document.getElementById('cases')!
root.appendChild(renderNav(cases))
for (const testCase of cases) {
  const section = renderCase(testCase)
  root.appendChild(section)
  wireCase(testCase, section)
}
