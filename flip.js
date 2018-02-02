'use strict';

var _templateObject = _taggedTemplateLiteralLoose(['\n  display: flex;\n'], ['\n  display: flex;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  background-image: url(', ');\n  width: .77em;\n  height: 1em;\n  background-size: 1em 10em;\n  background-repeat: repeat;\n  top: 0;\n  left: 0;\n'], ['\n  background-image: url(', ');\n  width: .77em;\n  height: 1em;\n  background-size: 1em 10em;\n  background-repeat: repeat;\n  top: 0;\n  left: 0;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n      will-change: auto;\n      transition: background-position ', 'ms;\n    '], ['\n      will-change: auto;\n      transition: background-position ', 'ms;\n    ']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

var r = require('html-text-generator');

var _require = require('emotion'),
    css = _require.css;

var nodeClass = css(_templateObject);

var willChange = void 0;
var digiClass = css(_templateObject2, require('./zero2nine.png'));

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
  return str2NumArr(padLeftStr(num.toString(), len));
};

module.exports = function () {
  function flip(_ref) {
    var _this = this;

    var node = _ref.node,
        from = _ref.from,
        to = _ref.to,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 1000 : _ref$duration,
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? 4 : _ref$delay;

    _classCallCheck(this, flip);

    willChange = css(_templateObject3, duration);
    node.classList.add(nodeClass);
    this.maxLen = maxLenNum(from, to || 0);
    this.node = node;
    this.displaing = num2PadNumArr(from, this.maxLen);
    this.from = from;
    this.initDigis();
    if (to) setTimeout(function () {
      _this.flipTo(to);
    }, delay);
  }

  flip.prototype.initDigis = function initDigis() {
    for (var i = 0; i < this.maxLen; i += 1) {
      var iNode = r(digiClass)();
      var offset = Math.floor(this.from / Math.pow(10, this.maxLen - 1 - i));
      iNode.style.backgroundPosition = 'center -' + offset % 100 + 'em';
      iNode.classList.add(willChange);
      this['digi' + i] = iNode;
      this.node.appendChild(iNode);
    }
  };

  flip.prototype.flipTo = function flipTo(num) {
    var numArr = num2PadNumArr(num, this.maxLen);
    for (var i = 0; i < this.maxLen; i += 1) {
      var offset = Number(numArr.slice(0, i + 1).join(''));
      this['digi' + i].style.backgroundPosition = 'center -' + offset % 100 + 'em';
    }
  };

  return flip;
}();