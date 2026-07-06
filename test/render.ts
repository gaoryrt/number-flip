import type { TestCase } from './types'

export function renderNav(cases: TestCase[]): HTMLElement {
  const nav = document.createElement('nav')
  nav.className = 'case-nav'
  nav.dataset.testid = 'case-nav'
  const title = document.createElement('h1')
  title.textContent = 'number-flip E2E 参数测试'
  nav.appendChild(title)
  const hint = document.createElement('p')
  hint.className = 'nav-hint'
  hint.textContent =
    '每个用例均可点击「回到上一状态」，将数字 flip 回上一次数值（可反复切换）。'
  nav.appendChild(hint)
  const list = document.createElement('ul')
  for (const c of cases) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = `#case-${c.id}`
    a.textContent = c.purpose
    li.appendChild(a)
    list.appendChild(li)
  }
  nav.appendChild(list)
  return nav
}

export function renderCase(testCase: TestCase): HTMLElement {
  const section = document.createElement('section')
  section.id = `case-${testCase.id}`
  section.dataset.testid = `case-${testCase.id}`
  section.dataset.caseId = testCase.id

  const h2 = document.createElement('h2')
  h2.textContent = `【测试目的】${testCase.purpose}`
  section.appendChild(h2)

  const fixture = document.createElement('div')
  fixture.className = 'fixture'

  const display = document.createElement('div')
  display.className = 'flip-node'
  display.dataset.testid = `case-${testCase.id}-display`
  fixture.appendChild(display)

  const meta = document.createElement('div')
  meta.className = 'meta'
  meta.dataset.testid = `case-${testCase.id}-meta`
  if (testCase.meta) meta.textContent = testCase.meta
  fixture.appendChild(meta)

  const actions = document.createElement('div')
  actions.className = 'actions'
  for (const action of testCase.actions ?? []) {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.textContent = action.label
    btn.dataset.testid = `case-${testCase.id}-btn-${action.id}`
    btn.dataset.actionId = action.id
    actions.appendChild(btn)
  }
  const backBtn = document.createElement('button')
  backBtn.type = 'button'
  backBtn.textContent = '回到上一状态'
  backBtn.dataset.testid = `case-${testCase.id}-btn-flip-back`
  backBtn.dataset.actionId = 'flip-back'
  backBtn.className = 'flip-back'
  actions.appendChild(backBtn)
  fixture.appendChild(actions)

  section.appendChild(fixture)

  const desc = document.createElement('p')
  desc.className = 'desc'
  desc.textContent = `【测试描述】${testCase.description}`
  section.appendChild(desc)

  const status = document.createElement('output')
  status.dataset.testid = `case-${testCase.id}-status`
  status.dataset.status = testCase.autoAssert ? 'pending' : 'manual'
  status.textContent = testCase.autoAssert
    ? '等待断言…'
    : '需人工/agent 目视验证'
  section.appendChild(status)

  return section
}
