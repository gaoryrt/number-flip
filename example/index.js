import Flip from '../flip'

const $ = n => document.querySelector(n)

const el = new Flip({
  node: $('.flip'),
  from: 9527,
  to: 42,
  duration: 2000,
  delay: 2000
})

$('#shuffle').addEventListener('click', () => {
  const num = (Math.random() * 10000).toFixed(0)
  $('.num').innerText = num
  el.flipTo(num)
})