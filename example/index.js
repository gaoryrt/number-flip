import { Flip } from '../number-flip'

const $ = s => document.querySelector(s)

const flip = new Flip({
  node: $('.flip'),
  from: 725,
  direct: false,
  easeFn: function(pos) {
    if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,3);
    return 0.5 * (Math.pow((pos-2),3) + 2);
  },
  maxLenNum: 7,
  // systemArr: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
})

$('button').onclick = () => {
  const num = ~~(Math.random() * 999999)
  $('.num').innerText = num
  flip.flipTo({to: num, direct: true})
}
