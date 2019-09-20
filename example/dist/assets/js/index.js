/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../number-flip.js":
/*!*************************!*\
  !*** ../number-flip.js ***!
  \*************************/
/*! exports provided: Flip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Flip", function() { return Flip; });
!(function webpackMissingModule() { var e = new Error("Cannot find module 'gelerator'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



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

var isstr = function isstr(any) {
  return Object.prototype.toString.call(any) === '[object String]';
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
        systemArr = _ref$systemArr === void 0 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : _ref$systemArr,
        _ref$direct = _ref.direct,
        direct = _ref$direct === void 0 ? true : _ref$direct,
        separator = _ref.separator,
        _ref$seperateOnly = _ref.seperateOnly,
        seperateOnly = _ref$seperateOnly === void 0 ? 0 : _ref$seperateOnly,
        _ref$separateEvery = _ref.separateEvery,
        separateEvery = _ref$separateEvery === void 0 ? 3 : _ref$separateEvery;

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
    this.separator = separator;
    this.seperateOnly = seperateOnly;
    this.separateEvery = seperateOnly ? 0 : separateEvery;

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
      this.node.classList.add('number-flip');
      this.node.style.position = 'relative';
      this.node.style.overflow = 'hidden';

      for (var i = 0; i < digits; i += 1) {
        var ctnr = !(function webpackMissingModule() { var e = new Error("Cannot find module 'gelerator'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("ctnr ctnr".concat(i)).apply(void 0, _toConsumableArray(this.systemArr.map(function (i) {
          return !(function webpackMissingModule() { var e = new Error("Cannot find module 'gelerator'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('digit')(i);
        })).concat([!(function webpackMissingModule() { var e = new Error("Cannot find module 'gelerator'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('digit')(this.systemArr[0])]));
        ctnr.style.position = 'relative';
        ctnr.style.display = 'inline-block';
        ctnr.style.verticalAlign = 'top';
        this.ctnrArr.unshift(ctnr);
        this.node.appendChild(ctnr);
        this.beforeArr.push(0);

        if (!this.separator || !this.separateEvery && !this.seperateOnly || i === digits - 1 || (digits - i) % this.separateEvery != 1 && digits - i - this.seperateOnly != 1) {
          continue;
        }

        var sprtrStr = isstr(this.separator) ? this.separator : this.separator.shift();
        var sprtr = !(function webpackMissingModule() { var e = new Error("Cannot find module 'gelerator'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('sprtr')(sprtrStr);
        sprtr.style.display = 'inline-block';
        this.node.appendChild(sprtr);
      }

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

      if (this.height !== this.ctnrArr[0].clientHeight / (this.systemArr.length + 1)) {
        this.height = this.ctnrArr[0].clientHeight / (this.systemArr.length + 1);
      }

      var from = this.beforeArr[digit];
      var modNum = ((per * alter + from) % 10 + 10) % 10;
      var translateY = "translateY(".concat(-modNum * this.height, "px)");
      this.ctnrArr[digit].style.webkitTransform = translateY;
      this.ctnrArr[digit].style.transform = translateY;
    }
  }, {
    key: "flipTo",
    value: function flipTo(_ref3) {
      var _this2 = this;

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

        for (var d = _this2.ctnrArr.length - 1; d >= 0; d -= 1) {
          var alter = _this2.afterArr[d] - _this2.beforeArr[d];
          temp += alter;
          var fn = easeFn || _this2.easeFn;

          _this2._draw({
            digit: d,
            per: fn(per),
            alter: direct ? alter : temp
          });

          temp *= 10;
        }
      };

      var start = Date.now();
      var dur = duration * 1000 || this.duration;

      var tick = function tick() {
        var elapsed = Date.now() - start;
        draw(elapsed / dur);
        if (elapsed < dur) requestAnimationFrame(tick);else {
          _this2.from = to;
          draw(1);
        }
      };

      window.addEventListener('resize', function () {
        _this2.height = _this2.ctnrArr[0].clientHeight / (_this2.systemArr.length + 1);
        _this2.node.style.height = _this2.height + 'px';
        draw(1);
      });
      requestAnimationFrame(tick);
    }
  }]);

  return Flip;
}();

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _number_flip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../number-flip */ "../number-flip.js");


var $ = function $(s) {
  return document.querySelector(s);
};

var flip = new _number_flip__WEBPACK_IMPORTED_MODULE_0__["Flip"]({
  node: $('.flip'),
  from: 7258829,
  easeFn: function easeFn(pos) {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
    return 0.5 * (Math.pow(pos - 2, 3) + 2);
  },
  systemArr: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
});

$('button').onclick = function () {
  var num = ~~(Math.random() * 9999999);
  $('.num').innerText = num;
  flip.flipTo({
    to: num,
    direct: true
  });
};

/***/ }),

/***/ 0:
/*!*********************!*\
  !*** multi ./index ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./index */"./index.js");


/***/ })

/******/ });
//# sourceMappingURL=index.js.map
