// const r = require('html-text-generator')
const g = require('gelerator')
const { css } = require('emotion')

// const nodeClass = css`
//   display: flex;
// `

// let willChange
// const digiClass = css`
//   background-image: url(${require('./zero2nine.png')});
//   width: .77em;
//   height: 1em;
//   background-size: 1em 10em;
//   background-repeat: repeat;
//   top: 0;
//   left: 0;
// `

// const maxLenNum = (aNum, bNum) => (aNum > bNum ? aNum : bNum).toString().length


// const num2PadNumArr = (num, len) => {
//   const padLeftStr = (rawStr, lenNum) => (rawStr.length < lenNum ?
//     padLeftStr('0' + rawStr, lenNum) :
//     rawStr)
//   const str2NumArr = rawStr => rawStr.split('').map(Number)
//   return str2NumArr(padLeftStr(num.toString(), len))
// }

module.exports = class flip {
  constructor({ node, from, to, duration = 1000, delay = 4 }) {
    willChange = css`
      will-change: auto;
    `
    node.classList.add(willChange)
    this.maxLen = maxLenNum(from, to || 0)
    this.node = node
    this.displaying = num2PadNumArr(from, this.maxLen)
    this.from = from
    this.initDigis()
    if (to) setTimeout(() => {
      this.flipTo(to)
    }, delay)
  }

  initDigis() {}

  flipTo() {}
}

// module.exports = class flip {
//   constructor({ node, from, to, duration = 1000, delay = 4 }) {
//     willChange = css`
//       will-change: auto;
//       transition: background-position ${duration}ms;
//     `
//     node.classList.add(nodeClass)
//     this.maxLen = maxLenNum(from, to || 0)
//     this.node = node
//     this.displaing = num2PadNumArr(from, this.maxLen)
//     this.from = from
//     this.initDigis()
//     if (to) setTimeout(() => {
//       this.flipTo(to)
//     }, delay)
//   }

//   initDigis() {
//     for(let i = 0; i < this.maxLen; i += 1) {
//       const iNode = r(digiClass)()
//       const offset = Math.floor(this.from / Math.pow(10, this.maxLen - 1 - i))
//       iNode.style.backgroundPosition = `center -${offset % 100}em`
//       iNode.classList.add(willChange)
//       this[`digi${i}`] = iNode
//       this.node.appendChild(iNode)
//     }
//   }

//   flipTo(num) {
//     const numArr = num2PadNumArr(num, this.maxLen)
//     for(let i = 0; i < this.maxLen; i += 1) {
//       const offset = Number(numArr.slice(0, i + 1).join(''))
//       this[`digi${i}`].style.backgroundPosition = `center -${offset % 100}em`
//     }
//   }
// }