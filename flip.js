const { g } = require('gelerator')

const maxLenNum = (aNum, bNum) => (aNum > bNum ? aNum : bNum).toString().length

const num2PadNumArr = (num, len) => {
  const padLeftStr = (rawStr, lenNum) => (rawStr.length < lenNum ?
    padLeftStr('0' + rawStr, lenNum) :
    rawStr)
  const str2NumArr = rawStr => rawStr.split('').map(Number)
  return str2NumArr(padLeftStr(num.toString(), len))
}

module.exports = class flip {
  constructor({
    node,
    from,
    to,
    duration,
    delay,
    easeFn,
    systemArr
  }) {
    this.beforeArr = []
    this.afterArr = []
    this.ctnrArr = []
    this.duration = (duration || 1) * 1000
    this.systemArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    this.easeFn = easeFn || (pos => (pos /= .5) < 1
                              ? .5 * Math.pow(pos, 3)
                              : .5 * (Math.pow((pos - 2), 3) + 2))
    this.from = from || 0
    this.to = to || 0
    this.delay = delay
    this.node = node
    this._initHTML(maxLenNum(this.from, this.to))
  }

  _initHTML(digits) {
    this.node.classList.add('number-flip')
    ;[...Array(digits).keys()].forEach(i => {
      const ctnr = g(`ctnr ctnr${i}`)(
        ...this.systemArr.map(i => g('digit')(i)),
        g('digit')(this.systemArr[0])
      )
      this.ctnrArr.unshift(ctnr)
      this.node.appendChild(ctnr)
      this.beforeArr.push(0)
    })
    this.height = this.ctnrArr[0].clientHeight / (this.systemArr.length + 1)
    this.node.style.height = this.height + 'px'
    for (let d = 0, len = this.ctnrArr.length; d < len; d += 1)
      this._draw({
        digit: d,
        per: 1,
        alter: ~~(this.from / Math.pow(10, d))
      })
  }

  _draw({per, alter, digit}) {
    const from = this.beforeArr[digit]
    const modNum = ((per * alter + from) % 10 + 10) % 10
    this.ctnrArr[digit].style.transform = `translateY(${- modNum * this.height}px)`
  }

  flipTo(num, {direct} = {}) {
    const len = this.ctnrArr.length
    this.beforeArr = num2PadNumArr(this.from, len).reverse()
    this.afterArr = num2PadNumArr(num, len).reverse()
    const draw = per => {
      let temp = 0
      for (let d = this.ctnrArr.length - 1; d >= 0; d -= 1) {
        let alter = this.afterArr[d] - this.beforeArr[d]
        temp += alter
        this._draw({
          digit: d,
          per: this.easeFn(per),
          alter: direct ? alter : temp
        })
        temp *= 10
      }
    }
    const start = performance.now()
    const duration = this.duration
    requestAnimationFrame(tick = now => {
      let elapsed = now - start
      draw(elapsed / duration)
      if (elapsed < duration) requestAnimationFrame(tick)
      else {
        this.from = num
        draw(1)
      }
    })
  }
}