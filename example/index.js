import './main.css'
import Flip from '../flip'

const $ = s => document.querySelector(s)

new Flip({
  node: $('.flip'),
  from: 9527,
  to: 42
})