# number-flip
Change number with flipping animation

![](./demo.gif)

![](./demo2.gif)

# install
```
$ npm install --save number-flip
```

# usage
## import `number-flip`
```
import Flip from 'number-flip'
```

## use it!
### create one and make it flip:
```js
new Flip({
  node: $('.flip'),
  from: 9527,
  to: 42
})
```

### flip one with delay:
```js
new Flip({
  node: $('.flip'),
  from: 9527,
  to: 42,
  delay: 1 // second
})
```

### create one and flip it later:
```js
const el = new Flip({
  node: $('.flip'),
  from: 9527
})

el.flipTo({to: 42})
```

### costumize animate duration:
```js
new Flip({
  node: document.querySelector('.flip'),
  from: 9527,
  to: 42,
  duration: 2 // second
})
```

### more complex usage
```js
new Flip({
  node: document.querySelector('.flip'),
  from: 73,
  to: 25,
  duration: 2,
  delay: 1,
  easeFn: function(pos) {
    if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,3);
    return 0.5 * (Math.pow((pos-2),3) + 2);
  },
  // for more easing function, see https://github.com/danro/easing-js/blob/master/easing.js
  systemArr: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
})
```

# TODO
- [x] flip with FLIP
- [ ] syntax
- [ ] browser compatibility list

# license
MIT

# contributing
1. fork this repo
2. `git checkout -b NEW-FEATURE`
3. `git commit -am 'ADD SOME FEATURE'`
4. `git push origin NEW-FEATURE`

