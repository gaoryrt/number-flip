import { Flip } from '../number-flip'
import {
  animTimeout,
  countDigitColumns,
  getSeparators,
  hasCustomStructure,
  hasNoLeadingSeparator,
  readFlipText,
  readFlipValue,
  waitForDigitMotion,
  waitForStableValue,
} from './assert'
import type { CaseContext, TestCase } from './types'

const CN = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']

function destroyFlip(flip: Flip | null) {
  flip?.destroy()
}

export const cases: TestCase[] = [
  {
    id: 'ctor-from-to',
    purpose: '构造参数 from + to：实例化后立即翻转',
    description:
      '页面加载后数字应从 from(100) 滚到 to(250)；点击「重新播放」后应再次从 100 滚到 250；点击「回到上一状态」可在 250 与 100 间反复 flip。',
    autoAssert: true,
    meta: 'from=100, to=250, duration=0.5s',
    setup(ctx) {
      return new Flip({
        node: ctx.display,
        from: 100,
        to: 250,
        duration: 0.5,
      })
    },
    actions: [
      {
        id: 'replay',
        label: '重新播放',
        assertAfter: true,
        run(ctx) {
          const old = ctx.getFlip()
          destroyFlip(old)
          ctx.display.innerHTML = ''
          ctx.setFlip(
            new Flip({
              node: ctx.display,
              from: 100,
              to: 250,
              duration: 0.5,
            }),
          )
          ctx.section.dataset.flipPrev = '100'
        },
      },
    ],
    async assert(ctx, flip) {
      await waitForStableValue(ctx.display, flip.from, {
        timeout: animTimeout(0.5),
      })
      const v = readFlipValue(ctx.display)
      return v === flip.from
        ? { pass: true, message: `pass：终值 ${v}` }
        : { pass: false, message: `fail：期望 ${flip.from}，实际 ${v}` }
    },
  },
  {
    id: 'ctor-no-to',
    purpose: '构造参数省略 to：初始静止在 from',
    description:
      '加载后应静止显示 9527；点击「翻转到 42」后应滚到 42；再点「回到上一状态」应滚回 9527。',
    autoAssert: true,
    meta: 'from=9527，无 to',
    setup(ctx) {
      return new Flip({ node: ctx.display, from: 9527 })
    },
    actions: [
      {
        id: 'flip',
        label: '翻转到 42',
        assertAfter: true,
        run(_ctx, flip) {
          flip.flipTo({ to: 42 })
        },
      },
    ],
    async assert(ctx, flip) {
      await waitForStableValue(ctx.display, flip.from, {
        timeout: animTimeout(0.5),
      })
      const v = readFlipValue(ctx.display)
      return v === flip.from
        ? { pass: true, message: `pass：终值 ${v}` }
        : { pass: false, message: `fail：期望 ${flip.from}，实际 ${v}` }
    },
  },
  {
    id: 'ctor-delay',
    purpose: '构造参数 delay：延迟启动动画',
    description:
      '点击「重新播放」后，前 1 秒内数字应保持 0 不变；约 1 秒后开始向 88 滚动，约 0.5 秒内完成。',
    autoAssert: false,
    meta: 'from=0, to=88, delay=1s, duration=0.5s',
    setup(ctx) {
      return new Flip({
        node: ctx.display,
        from: 0,
        to: 88,
        delay: 1,
        duration: 0.5,
      })
    },
    actions: [
      {
        id: 'replay',
        label: '重新播放',
        run(ctx) {
          const old = ctx.getFlip()
          destroyFlip(old)
          ctx.display.innerHTML = ''
          ctx.setFlip(
            new Flip({
              node: ctx.display,
              from: 0,
              to: 88,
              delay: 1,
              duration: 0.5,
            }),
          )
          ctx.section.dataset.flipPrev = '0'
        },
      },
    ],
  },
  {
    id: 'ctor-duration',
    purpose: '构造参数 duration：控制动画时长',
    description:
      '点击「重新播放」后，从 0 到 50 的翻转应约 2 秒完成（明显慢于默认 0.5s）。',
    autoAssert: false,
    meta: 'from=0, to=50, duration=2s',
    setup(ctx) {
      return new Flip({
        node: ctx.display,
        from: 0,
        to: 50,
        duration: 2,
      })
    },
    actions: [
      {
        id: 'replay',
        label: '重新播放',
        run(ctx) {
          const old = ctx.getFlip()
          destroyFlip(old)
          ctx.display.innerHTML = ''
          ctx.setFlip(
            new Flip({
              node: ctx.display,
              from: 0,
              to: 50,
              duration: 2,
            }),
          )
          ctx.section.dataset.flipPrev = '0'
        },
      },
    ],
  },
  {
    id: 'opt-systemArr',
    purpose: '构造参数 systemArr：自定义数字字符集',
    description:
      '加载后显示中文大写「柒叁」；点击「翻转到 贰伍」后应显示「贰伍」；点「回到上一状态」应回到「柒叁」。',
    autoAssert: true,
    meta: 'systemArr=中文大写数字',
    setup(ctx) {
      return new Flip({
        node: ctx.display,
        from: 73,
        systemArr: CN,
      })
    },
    actions: [
      {
        id: 'flip',
        label: '翻转到 贰伍',
        assertAfter: true,
        run(_ctx, flip) {
          flip.flipTo({ to: 25 })
        },
      },
    ],
    async assert(ctx, flip) {
      await new Promise((r) => setTimeout(r, animTimeout(0.5)))
      const text = readFlipText(ctx.display)
      const want = String(flip.from)
        .split('')
        .map((d) => CN[Number(d)])
      const ok = want.every((c) => text.includes(c))
      return ok
        ? { pass: true, message: `pass：显示「${text}」` }
        : { pass: false, message: `fail：期望含 ${want.join('')}，实际「${text}」` }
    },
  },
  {
    id: 'opt-direct-true',
    purpose: '构造参数 direct:true — 各位独立滚动',
    description:
      '左侧 direct:true、右侧 direct:false，均从 0 翻到 99。左侧个位只滚 9 格（0→9），右侧个位会连续滚 99 格（进位联动）。点击「开始对比」触发。',
    autoAssert: false,
    meta: '对比：direct:true vs direct:false',
    setup(ctx) {
      const wrap = document.createElement('div')
      wrap.className = 'compare-row'
      const left = document.createElement('div')
      left.className = 'flip-node compare-item'
      left.dataset.testid = 'case-opt-direct-true-left'
      const right = document.createElement('div')
      right.className = 'flip-node compare-item'
      right.dataset.testid = 'case-opt-direct-true-right'
      wrap.appendChild(left)
      wrap.appendChild(right)
      ctx.display.appendChild(wrap)
      ctx.display.dataset.compareLeft = ''
      ctx.display.dataset.compareRight = ''
        ; (ctx.display as HTMLElement & { _left?: HTMLElement; _right?: HTMLElement })._left = left
        ; (ctx.display as HTMLElement & { _left?: HTMLElement; _right?: HTMLElement })._right = right
      return new Flip({ node: left, from: 0, direct: true })
    },
    actions: [
      {
        id: 'start',
        label: '开始对比',
        run(ctx) {
          const d = ctx.display as HTMLElement & {
            _left?: HTMLElement
            _right?: HTMLElement
            _flipRight?: Flip
          }
          destroyFlip(ctx.getFlip())
          destroyFlip(d._flipRight ?? null)
          d._left!.innerHTML = ''
          d._right!.innerHTML = ''
          ctx.setFlip(new Flip({ node: d._left!, from: 0, direct: true }))
          d._flipRight = new Flip({ node: d._right!, from: 0, direct: false })
          ctx.section.dataset.flipPrev = '0'
          ctx.getFlip()!.flipTo({ to: 99 })
          d._flipRight.flipTo({ to: 99 })
        },
      },
    ],
  },
  {
    id: 'opt-direct-false',
    purpose: '构造参数 direct:false — 进位联动滚动',
    description:
      '点击「翻转到 99」后，个位会连续滚过 99 个数字（非 direct 模式）。观察个位滚动圈数应多于 direct:true。',
    autoAssert: false,
    meta: 'direct=false, from=0',
    setup(ctx) {
      return new Flip({ node: ctx.display, from: 0, direct: false })
    },
    actions: [
      {
        id: 'flip',
        label: '翻转到 99',
        run(_ctx, flip) {
          flip.flipTo({ to: 99, direct: false })
        },
      },
    ],
  },
  {
    id: 'opt-separator-string',
    purpose: '构造参数 separator 字符串 + separateEvery 默认 3',
    description:
      '加载后应显示带千分位逗号的 95,279,527；点击「重新播放」后仍应保持逗号分隔格式。',
    autoAssert: true,
    meta: 'separator=",", from=95279527',
    setup(ctx) {
      return new Flip({
        node: ctx.display,
        from: 95279527,
        separator: ',',
      })
    },
    actions: [
      {
        id: 'replay',
        label: '重新播放',
        assertAfter: true,
        run(ctx) {
          const old = ctx.getFlip()
          destroyFlip(old)
          ctx.display.innerHTML = ''
          ctx.setFlip(
            new Flip({
              node: ctx.display,
              from: 95279527,
              to: 12345678,
              separator: ',',
            }),
          )
          ctx.section.dataset.flipPrev = '95279527'
        },
      },
    ],
    async assert(ctx, flip) {
      await waitForStableValue(ctx.display, flip.from, {
        timeout: animTimeout(0.5),
      })
      const seps = getSeparators(ctx.display)
      const text = readFlipText(ctx.display)
      const sepCount = Math.max(0, Math.ceil(String(flip.from).length / 3) - 1)
      const ok =
        seps.length === sepCount &&
        seps.every((s) => s === ',') &&
        text.includes(',')
      return ok
        ? { pass: true, message: `pass：值 ${flip.from}，分隔符 ${JSON.stringify(seps)}，文本 ${text}` }
        : {
          pass: false,
          message: `fail：值 ${flip.from}，分隔符 ${JSON.stringify(seps)}，文本 ${text}`,
        }
    },
  },
  {
    id: 'opt-separator-array',
    purpose: '构造参数 separator 数组 + separateEvery:4',
    description:
      '大数 123456789 应按每 4 位插入「万」「亿」分隔符；点击「重新播放」翻转到 999999999 后分隔符序列应为万、亿。',
    autoAssert: true,
    meta: "separator=['万','亿'], separateEvery=4",
    setup(ctx) {
      return new Flip({
        node: ctx.display,
        from: 123456789,
        separator: ['万', '亿'],
        separateEvery: 4,
      })
    },
    actions: [
      {
        id: 'replay',
        label: '重新播放',
        assertAfter: true,
        run(ctx) {
          const old = ctx.getFlip()
          destroyFlip(old)
          ctx.display.innerHTML = ''
          ctx.setFlip(
            new Flip({
              node: ctx.display,
              from: 123456789,
              to: 999999999,
              separator: ['万', '亿'],
              separateEvery: 4,
            }),
          )
          ctx.section.dataset.flipPrev = '123456789'
        },
      },
    ],
    async assert(ctx, flip) {
      await waitForStableValue(ctx.display, flip.from, {
        timeout: animTimeout(0.5),
      })
      const seps = getSeparators(ctx.display)
      const digits = String(flip.from).length
      const sepCount = Math.max(0, Math.ceil(digits / 4) - 1)
      const ok =
        seps.length === sepCount &&
        (sepCount === 0 ||
          (seps[0] === '万' && (sepCount === 1 || seps[1] === '亿')))
      return ok
        ? { pass: true, message: `pass：值 ${flip.from}，分隔符 ${JSON.stringify(seps)}` }
        : { pass: false, message: `fail：值 ${flip.from}，实际 ${JSON.stringify(seps)}` }
    },
  },
  {
    id: 'opt-separateOnly',
    purpose: '构造参数 separateOnly：仅一处分隔',
    description:
      '8 位数 12345678 应只在 separateOnly 指定位置出现 1 个逗号分隔符；点击「翻转到 87654321」后可点「回到上一状态」回到 12345678。',
    autoAssert: true,
    meta: 'separator=",", separateOnly=4, from=12345678',
    setup(ctx) {
      return new Flip({
        node: ctx.display,
        from: 12345678,
        separator: ',',
        separateOnly: 4,
      })
    },
    actions: [
      {
        id: 'flip',
        label: '翻转到 87654321',
        assertAfter: true,
        run(_ctx, flip) {
          flip.flipTo({ to: 87654321 })
        },
      },
    ],
    async assert(ctx, flip) {
      await waitForStableValue(ctx.display, flip.from, {
        timeout: animTimeout(0.5),
      })
      const seps = getSeparators(ctx.display)
      const ok = seps.length === 1 && seps[0] === ','
      return ok
        ? { pass: true, message: `pass：分隔符数量 ${seps.length}` }
        : { pass: false, message: `fail：期望 1 个逗号，实际 ${JSON.stringify(seps)}` }
    },
  },
  {
    id: 'opt-classNames',
    purpose: '构造参数 containerClassName / digitClassName / separatorClassName',
    description:
      'DOM 中应存在自定义类名 .c（容器）、.d（数字）、.s（分隔符）；点击「翻转到 9999999」后可点「回到上一状态」回到 1000000。',
    autoAssert: true,
    meta: 'containerClassName=c, digitClassName=d, separatorClassName=s',
    setup(ctx) {
      return new Flip({
        node: ctx.display,
        from: 1000000,
        separator: ',',
        containerClassName: 'c',
        digitClassName: 'd',
        separatorClassName: 's',
      })
    },
    actions: [
      {
        id: 'flip',
        label: '翻转到 9999999',
        assertAfter: true,
        run(_ctx, flip) {
          flip.flipTo({ to: 9999999 })
        },
      },
    ],
    async assert(ctx, flip) {
      await waitForStableValue(ctx.display, flip.from, {
        timeout: animTimeout(0.5),
        containerClass: 'c',
      })
      const ok = hasCustomStructure(ctx.display, {
        container: 'c',
        digit: 'd',
        separator: 's',
      })
      const noDefault =
        !ctx.display.querySelector('.ctnr') &&
        !ctx.display.querySelector('.digit') &&
        !ctx.display.querySelector('.sprtr')
      const v = readFlipValue(ctx.display, 'c')
      const valueOk = v === flip.from
      return ok && noDefault && valueOk
        ? { pass: true, message: `pass：自定义类名 c/d/s，值 ${v}` }
        : { pass: false, message: 'fail：类名或数值不符' }
    },
  },
  {
    id: 'opt-digit-expand',
    purpose: 'flipTo 位数扩展：99 → 10000',
    description:
      '点击「扩展到 10000」后列数 5、终值 10000；点「回到上一状态」应回到 99。',
    autoAssert: true,
    meta: 'from=99',
    setup(ctx) {
      return new Flip({ node: ctx.display, from: 99, direct: false })
    },
    actions: [
      {
        id: 'expand',
        label: '扩展到 10000',
        assertAfter: true,
        async run(ctx, flip) {
          const motion = await waitForDigitMotion(
            ctx.display,
            () => flip.flipTo({ to: 10000, direct: false, duration: 5 }),
            { timeout: animTimeout(0.5) },
          )
          ctx.section.dataset.motionOk = motion ? '1' : '0'
        },
      },
    ],
    async assert(ctx, flip) {
      if (ctx.section.dataset.motionOk === '0') {
        return { pass: false, message: 'fail：扩展过程中未检测到位滚动' }
      }
      await waitForStableValue(ctx.display, flip.from, {
        timeout: animTimeout(0.5),
      })
      const cols = countDigitColumns(ctx.display)
      const v = readFlipValue(ctx.display)
      const wantCols = String(flip.from).length
      const ok = cols === wantCols && v === flip.from
      return ok
        ? { pass: true, message: `pass：${cols} 列，值 ${v}` }
        : {
          pass: false,
          message: `fail：期望 ${wantCols} 列/${flip.from}，实际 ${cols} 列/${v}`,
        }
    },
  },
  {
    id: 'opt-digit-shrink',
    purpose: 'flipTo 位数收缩：10000 → 9',
    description:
      '点击「收缩到 9」后列数 1、终值 9；点「回到上一状态」应回到 10000。',
    autoAssert: true,
    meta: 'from=10000',
    setup(ctx) {
      return new Flip({ node: ctx.display, from: 10000, direct: false })
    },
    actions: [
      {
        id: 'shrink',
        label: '收缩到 9',
        assertAfter: true,
        async run(ctx, flip) {
          const motion = await waitForDigitMotion(
            ctx.display,
            () => flip.flipTo({ to: 9, direct: false }),
            { timeout: animTimeout(0.5) },
          )
          ctx.section.dataset.motionOk = motion ? '1' : '0'
        },
      },
    ],
    async assert(ctx, flip) {
      if (ctx.section.dataset.motionOk === '0') {
        return { pass: false, message: 'fail：收缩过程中未检测到位滚动' }
      }
      await waitForStableValue(ctx.display, flip.from, {
        timeout: animTimeout(0.5),
      })
      const cols = countDigitColumns(ctx.display)
      const v = readFlipValue(ctx.display)
      const wantCols = String(flip.from).length
      const ok = cols === wantCols && v === flip.from
      return ok
        ? { pass: true, message: `pass：${cols} 列，值 ${v}` }
        : {
          pass: false,
          message: `fail：期望 ${wantCols} 列/${flip.from}，实际 ${cols} 列/${v}`,
        }
    },
  },
  {
    id: 'edge-separator-digit-change',
    purpose: '边缘：有 separator 且位数变化时，最左侧不能出现分隔符',
    description:
      '初始 999；点击「扩展到 10000」后应显示 10,000 且最左为数字 1；点「回到上一状态」回到 999；再点「收缩到 9」后到 9，点「回到上一状态」回到 10000。',
    autoAssert: true,
    meta: 'separator=",", from=999',
    setup(ctx) {
      return new Flip({
        node: ctx.display,
        from: 999,
        separator: ',',
        direct: false,
      })
    },
    actions: [
      {
        id: 'expand',
        label: '扩展到 10000',
        assertAfter: true,
        run(_ctx, flip) {
          flip.flipTo({ to: 10000, direct: false })
        },
      },
      {
        id: 'shrink',
        label: '收缩到 9',
        assertAfter: true,
        async run(ctx, flip) {
          const motion = await waitForDigitMotion(
            ctx.display,
            () => flip.flipTo({ to: 9, direct: false }),
            { timeout: animTimeout(0.5) },
          )
          ctx.section.dataset.motionOk = motion ? '1' : '0'
        },
      },
    ],
    async assert(ctx, flip) {
      if (ctx.section.dataset.motionOk === '0') {
        return { pass: false, message: 'fail：收缩过程中未检测到位滚动' }
      }
      await waitForStableValue(ctx.display, flip.from, {
        timeout: animTimeout(0.5),
      })
      const v = readFlipValue(ctx.display)
      const noLead = hasNoLeadingSeparator(ctx.display)
      const text = readFlipText(ctx.display)
      const ok = noLead && v === flip.from && !/^[,，]/.test(text)
      return ok
        ? {
          pass: true,
          message: `pass：值 ${v}，最左为数字列，文本「${text}」`,
        }
        : {
          pass: false,
          message: `fail：值 ${v}（期望 ${flip.from}），最左分隔符=${!noLead}，文本「${text}」`,
        }
    },
  },
  {
    id: 'flipTo-duration',
    purpose: 'flipTo 参数 duration：覆盖实例默认时长',
    description:
      '点击「慢速翻转」后，从 0 到 77 应约 3 秒完成（flipTo duration=3）。',
    autoAssert: false,
    meta: 'from=0，flipTo duration=3',
    setup(ctx) {
      return new Flip({ node: ctx.display, from: 0 })
    },
    actions: [
      {
        id: 'slow',
        label: '慢速翻转',
        run(_ctx, flip) {
          flip.flipTo({ to: 77, duration: 3 })
        },
      },
    ],
  },
  {
    id: 'flipTo-direct',
    purpose: 'flipTo 参数 direct：运行时覆盖滚动模式',
    description:
      '点击「direct:false 翻转」后，从 0 到 15 应以进位联动方式滚动（个位连续滚过 15 格）。',
    autoAssert: false,
    meta: 'from=0, direct:true 实例，flipTo direct:false',
    setup(ctx) {
      return new Flip({ node: ctx.display, from: 0, direct: true })
    },
    actions: [
      {
        id: 'flip',
        label: 'direct:false 翻转',
        run(_ctx, flip) {
          flip.flipTo({ to: 15, direct: false })
        },
      },
    ],
  },
  {
    id: 'flipTo-easeFn',
    purpose: 'flipTo 参数 easeFn：运行时覆盖缓动',
    description:
      '点击「线性 easing」后，动画应以线性速度完成（无 easeInOut 加减速感）。',
    autoAssert: false,
    meta: 'from=0, flipTo easeFn=线性',
    setup(ctx) {
      return new Flip({ node: ctx.display, from: 0 })
    },
    actions: [
      {
        id: 'linear',
        label: '线性 easing',
        run(_ctx, flip) {
          flip.flipTo({
            to: 60,
            easeFn: (pos: number) => pos,
          })
        },
      },
    ],
  },
  {
    id: 'method-destroy',
    purpose: '实例方法 destroy()：移除 resize 监听',
    description:
      '点击「destroy」后实例销毁；再点击「触发 resize」窗口高度变化时，数字区域不应再自动重排（与未 destroy 时对比需目视）。',
    autoAssert: false,
    meta: 'from=1234',
    setup(ctx) {
      return new Flip({ node: ctx.display, from: 1234 })
    },
    actions: [
      {
        id: 'destroy',
        label: 'destroy',
        run(_ctx, flip) {
          flip.destroy()
        },
      },
      {
        id: 'resize',
        label: '触发 resize',
        run() {
          window.dispatchEvent(new Event('resize'))
        },
      },
    ],
  },
]
