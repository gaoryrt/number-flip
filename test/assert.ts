export type CaseStatus = 'pending' | 'pass' | 'fail' | 'manual'

const DEFAULT_SYSTEM = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export function getTranslateY(el: HTMLElement): number {
  const style = el.style.transform || el.style.webkitTransform || ''
  const match = style.match(/translateY\((-?\d+(?:\.\d+)?)px\)/)
  return match ? parseFloat(match[1]) : 0
}

export function getDigitColumns(
  node: HTMLElement,
  containerClass = 'ctnr',
): HTMLElement[] {
  return [...node.querySelectorAll<HTMLElement>(`.${containerClass}`)]
}

export function readDigitText(ctnr: HTMLElement): string {
  const ty = getTranslateY(ctnr)
  const firstDigit = ctnr.querySelector<HTMLElement>(':scope > *')
  const height = firstDigit?.offsetHeight || 0
  if (!height || !ctnr.children.length) return ''
  const modNum = Math.round(-ty / height)
  const idx =
    ((modNum % ctnr.children.length) + ctnr.children.length) %
    ctnr.children.length
  return (ctnr.children[idx] as HTMLElement).innerText.trim()
}

export function readFlipText(
  node: HTMLElement,
  containerClass = 'ctnr',
  separatorClass = 'sprtr',
): string {
  const parts: string[] = []
  for (const child of node.children) {
    if (child.classList.contains(containerClass)) {
      parts.push(readDigitText(child as HTMLElement))
    } else if (child.classList.contains(separatorClass)) {
      parts.push((child as HTMLElement).innerText.trim())
    }
  }
  return parts.join('')
}

export function readFlipValue(
  node: HTMLElement,
  containerClass = 'ctnr',
): number {
  const columns = getDigitColumns(node, containerClass)
  let value = 0
  for (let i = 0; i < columns.length; i += 1) {
    const text = readDigitText(columns[i])
    const digit = Number(text)
    if (Number.isNaN(digit)) return NaN
    const place = columns.length - 1 - i
    value += digit * Math.pow(10, place)
  }
  return value
}

export function countDigitColumns(
  node: HTMLElement,
  containerClass = 'ctnr',
): number {
  return getDigitColumns(node, containerClass).length
}

export function getSeparators(
  node: HTMLElement,
  separatorClass = 'sprtr',
): string[] {
  return [...node.querySelectorAll<HTMLElement>(`.${separatorClass}`)].map(
    (el) => el.innerText.trim(),
  )
}

/** 最左侧子节点必须是数字列，不能是分隔符 */
export function hasNoLeadingSeparator(
  node: HTMLElement,
  containerClass = 'ctnr',
): boolean {
  const first = node.firstElementChild
  if (!first) return true
  return first.classList.contains(containerClass)
}

export function hasCustomStructure(
  node: HTMLElement,
  names: { container: string; digit: string; separator: string },
): boolean {
  return (
    node.querySelector(`.${names.container}`) !== null &&
    node.querySelector(`.${names.digit}`) !== null &&
    node.querySelector(`.${names.separator}`) !== null
  )
}

export function waitUntil(
  fn: () => boolean,
  { timeout = 3000, interval = 50 }: { timeout?: number; interval?: number } = {},
): Promise<void> {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tick = () => {
      if (fn()) {
        resolve()
        return
      }
      if (Date.now() - start >= timeout) {
        reject(new Error('waitUntil timeout'))
        return
      }
      setTimeout(tick, interval)
    }
    tick()
  })
}

export function waitForStableValue(
  node: HTMLElement,
  expected: number,
  {
    timeout = 3000,
    containerClass = 'ctnr',
    stableFrames = 3,
  }: {
    timeout?: number
    containerClass?: string
    stableFrames?: number
  } = {},
): Promise<void> {
  let stable = 0
  let last = NaN
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tick = () => {
      const current = readFlipValue(node, containerClass)
      if (current === expected) {
        if (current === last) stable += 1
        else stable = 1
        last = current
        if (stable >= stableFrames) {
          resolve()
          return
        }
      } else {
        stable = 0
        last = current
      }
      if (Date.now() - start >= timeout) {
        reject(
          new Error(`expected ${expected}, got ${current} (stable=${stable})`),
        )
        return
      }
      requestAnimationFrame(tick)
    }
    tick()
  })
}

export function setStatus(
  section: HTMLElement,
  status: CaseStatus,
  message: string,
): void {
  const output = section.querySelector<HTMLElement>('[data-testid$="-status"]')
  if (!output) return
  output.dataset.status = status
  output.textContent = message
}

export function animTimeout(
  durationSec = 0.5,
  delaySec = 0,
  bufferMs = 300,
): number {
  return (durationSec + delaySec) * 1000 + bufferMs
}

/** 在 run() 触发 flip 期间采样 translateY，确认有位滚动 */
export function waitForDigitMotion(
  node: HTMLElement,
  run: () => void,
  {
    timeout = 800,
    containerClass = 'ctnr',
  }: { timeout?: number; containerClass?: string } = {},
): Promise<boolean> {
  const baseline = getDigitColumns(node, containerClass).map((c) =>
    getTranslateY(c),
  )
  run()
  const start = Date.now()
  return new Promise((resolve) => {
    const tick = () => {
      const cols = getDigitColumns(node, containerClass)
      for (let i = 0; i < cols.length; i += 1) {
        if (getTranslateY(cols[i]) !== baseline[i]) {
          resolve(true)
          return
        }
      }
      if (Date.now() - start >= timeout) {
        resolve(false)
        return
      }
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}

export { DEFAULT_SYSTEM }
