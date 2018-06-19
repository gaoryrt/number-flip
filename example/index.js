import './main.css'
import Flip from '../flip'

const el = new Flip({
  node: document.querySelector('.app'),
  from: 377
})

el._change(612)
