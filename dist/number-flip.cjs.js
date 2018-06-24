'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var _require = require('gelerator'),
    g = _require.g;

var maxLenNum = function maxLenNum(aNum, bNum) {
  return (aNum > bNum ? aNum : bNum).toString().length;
};

var num2PadNumArr = function num2PadNumArr(num, len) {
  var padLeftStr = function padLeftStr(rawStr, lenNum) {
    return rawStr.length < lenNum ? padLeftStr('0' + rawStr, lenNum) : rawStr;
  };

  var str2NumArr = function str2NumArr(rawStr) {
    return rawStr.split('').map(Number);
  };

  return str2NumArr(padLeftStr(num.toString(), len)).reverse();
};

var Flip =
/*#__PURE__*/
function () {
  function Flip(_ref) {
    var _this = this;

    var node = _ref.node,
        _ref$from = _ref.from,
        from = _ref$from === void 0 ? 0 : _ref$from,
        to = _ref.to,
        _ref$duration = _ref.duration,
        duration = _ref$duration === void 0 ? .5 : _ref$duration,
        delay = _ref.delay,
        _ref$easeFn = _ref.easeFn,
        easeFn = _ref$easeFn === void 0 ? function (pos) {
      return (pos /= .5) < 1 ? .5 * Math.pow(pos, 3) : .5 * (Math.pow(pos - 2, 3) + 2);
    } : _ref$easeFn,
        _ref$systemArr = _ref.systemArr,
        systemArr = _ref$systemArr === void 0 ? _toConsumableArray(Array(10).keys()) : _ref$systemArr,
        _ref$direct = _ref.direct,
        direct = _ref$direct === void 0 ? true : _ref$direct;

    _classCallCheck(this, Flip);

    this.beforeArr = [];
    this.afterArr = [];
    this.ctnrArr = [];
    this.duration = duration * 1000;
    this.systemArr = systemArr;
    this.easeFn = easeFn;
    this.from = from;
    this.to = to || 0;
    this.node = node;
    this.direct = direct;

    this._initHTML(maxLenNum(this.from, this.to));

    if (to === undefined) return;
    if (delay) setTimeout(function () {
      return _this.flipTo({
        to: _this.to,
        direct: direct
      });
    }, delay * 1000);else this.flipTo({
      to: this.to,
      direct: direct
    });
  }

  _createClass(Flip, [{
    key: "_initHTML",
    value: function _initHTML(digits) {
      var _this2 = this;

      this.node.classList.add('number-flip');
      this.node.style.position = 'relative';
      this.node.style.overflow = 'hidden';

      _toConsumableArray(Array(digits).keys()).forEach(function (i) {
        var ctnr = g("ctnr ctnr".concat(i)).apply(void 0, _toConsumableArray(_this2.systemArr.map(function (i) {
          return g('digit')(i);
        })).concat([g('digit')(_this2.systemArr[0])]));
        ctnr.style.position = 'relative';
        ctnr.style.display = 'inline-block';

        _this2.ctnrArr.unshift(ctnr);

        _this2.node.appendChild(ctnr);

        _this2.beforeArr.push(0);
      });

      this.height = this.ctnrArr[0].clientHeight / (this.systemArr.length + 1);
      this.node.style.height = this.height + 'px';

      for (var d = 0, len = this.ctnrArr.length; d < len; d += 1) {
        this._draw({
          digit: d,
          per: 1,
          alter: ~~(this.from / Math.pow(10, d))
        });
      }
    }
  }, {
    key: "_draw",
    value: function _draw(_ref2) {
      var per = _ref2.per,
          alter = _ref2.alter,
          digit = _ref2.digit;
      var from = this.beforeArr[digit];
      var modNum = ((per * alter + from) % 10 + 10) % 10;
      var translateY = "translateY(".concat(-modNum * this.height, "px)");
      this.ctnrArr[digit].style.webkitTransform = translateY;
      this.ctnrArr[digit].style.transform = translateY;
    }
  }, {
    key: "flipTo",
    value: function flipTo(_ref3) {
      var _this3 = this;

      var to = _ref3.to,
          duration = _ref3.duration,
          easeFn = _ref3.easeFn,
          _ref3$direct = _ref3.direct,
          direct = _ref3$direct === void 0 ? true : _ref3$direct;
      var len = this.ctnrArr.length;
      this.beforeArr = num2PadNumArr(this.from, len);
      this.afterArr = num2PadNumArr(to, len);

      var draw = function draw(per) {
        var temp = 0;

        for (var d = _this3.ctnrArr.length - 1; d >= 0; d -= 1) {
          var alter = _this3.afterArr[d] - _this3.beforeArr[d];
          temp += alter;
          var fn = easeFn || _this3.easeFn;

          _this3._draw({
            digit: d,
            per: fn(per),
            alter: direct ? alter : temp
          });

          temp *= 10;
        }
      };

      var start = performance.now();
      var dur = duration * 1000 || this.duration;

      var tick = function tick(now) {
        var elapsed = now - start;
        draw(elapsed / dur);
        if (elapsed < dur) requestAnimationFrame(tick);else {
          _this3.from = to;
          draw(1);
        }
      };

      requestAnimationFrame(tick);
    }
  }]);

  return Flip;
}();

exports.Flip = Flip;
