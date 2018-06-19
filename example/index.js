import './main.css'
import Flip from '../flip'

const el = new Flip({
  node: document.querySelector('.app'),
  from: 1000,
  duration: .5
})

let num = 1001
setInterval(() => {
  // const num = ~~(Math.random() * 9999)
  num += 3
  el.flipTo({to: num})
}, 1000)