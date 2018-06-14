import './main.css'

const duration = 4000
const dest = 32


const elem = document.querySelector('.ctnr')


// const ease = pos => {
//   if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,3);
//   return 0.5 * (Math.pow((pos-2),3) + 2);
// }

const easeFn = pos => (pos /= .5) < 1
  ? .5 * Math.pow(pos, 3)
  : .5 * (Math.pow((pos - 2), 3) + 2)
const draw = percent => {
  const translateY = - easeFn(percent) * 50 * dest % 500
  elem.style.transform = `translateY(${translateY}px)`
}
const done = () => {
  elem.style.transform = `translateY(${50 * dest % 500}px)`
}




const start = performance.now()
requestAnimationFrame(function tick(now) {
  let elapsed = now - start
  draw(elapsed / duration)
  if (elapsed < duration) requestAnimationFrame(tick)
  else done()
})

