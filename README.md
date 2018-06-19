# number-flip
Change number with flipping animation

![](./demo.gif)

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
```
new Flip({
  node: $('.flip'),
  from: 9527,
  to: 42
})
```

### flip one with delay:
```
new Flip({
  node: $('.flip'),
  from: 9527,
  to: 42,
  delay: 1000
})
```

### create one and flip it later:
```
const el = new Flip({
  node: $('.flip'),
  from: 9527
})

el.flipTo(42)
```

### costumize animate duration:
```
new Flip({
  node: $('.flip'),
  from: 9527,
  to: 42,
  duration: 2000
})
```

# TODO
- [ ] css3 animation - instead of a picture
- [ ] flip with FLIP
- [ ] browser compatibility list
- [ ] thresh maybe

# license
MIT

# contributing
1. fork this repo
2. `git checkout -b NEW-FEATURE`
3. `git commit -am 'ADD SOME FEATURE'`
4. `git push origin NEW-FEATURE`

