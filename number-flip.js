"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flip = void 0;
var maxLenNum = function (aNum, bNum) {
    return (aNum > bNum ? aNum : bNum).toString().length;
};
var num2PadNumArr = function (num, len) {
    var padLeftStr = function (rawStr, lenNum) {
        return rawStr.length < lenNum ? padLeftStr("0" + rawStr, lenNum) : rawStr;
    };
    var str2NumArr = function (rawStr) { return rawStr.split("").map(Number); };
    return str2NumArr(padLeftStr(num.toString(), len)).reverse();
};
var isstr = function (any) {
    return Object.prototype.toString.call(any) === "[object String]";
};
var Flip = /** @class */ (function () {
    function Flip(_a) {
        var node = _a.node, _b = _a.from, from = _b === void 0 ? 0 : _b, to = _a.to, _c = _a.duration, duration = _c === void 0 ? 0.5 : _c, delay = _a.delay, _d = _a.easeFn, easeFn = _d === void 0 ? function (pos) {
            return (pos /= 0.5) < 1
                ? 0.5 * Math.pow(pos, 3)
                : 0.5 * (Math.pow(pos - 2, 3) + 2);
        } : _d, _e = _a.systemArr, systemArr = _e === void 0 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : _e, _f = _a.direct, direct = _f === void 0 ? true : _f, separator = _a.separator, _g = _a.separateOnly, separateOnly = _g === void 0 ? 0 : _g, _h = _a.separateEvery, separateEvery = _h === void 0 ? 3 : _h, _j = _a.containerClassName, containerClassName = _j === void 0 ? "ctnr" : _j, _k = _a.digitClassName, digitClassName = _k === void 0 ? "digit" : _k, _l = _a.separatorClassName, separatorClassName = _l === void 0 ? "sprtr" : _l;
        var _this = this;
        this._resizeHandler = this._resize.bind(this);
        this.beforeArr = [];
        this.afterArr = [];
        this.digitContainers = [];
        this.duration = duration * 1000;
        this.systemArr = systemArr;
        this.easeFn = easeFn;
        this.from = from;
        this.to = to || 0;
        this.node = node;
        this.direct = direct;
        this.separator = separator;
        this.separateOnly = separateOnly;
        this.separateEvery = separateOnly ? 0 : separateEvery;
        this.containerClassName = containerClassName;
        this.digitClassName = digitClassName;
        this.separatorClassName = separatorClassName;
        this._initHTML(maxLenNum(this.from, this.to));
        this.setSelect(this.from);
        if (to === undefined)
            return;
        if (delay)
            setTimeout(function () { return _this.flipTo({ to: _this.to }); }, delay * 1000);
        else
            this.flipTo({ to: this.to });
    }
    Flip.prototype._initHTML = function (digits) {
        this.node.classList.add("number-flip");
        this.node.style.position = "relative";
        this.node.style.overflow = "hidden";
        for (var i = 0; i < digits; i += 1) {
            var ctnr = document.createElement("div");
            ctnr.className = "".concat(this.containerClassName, " ").concat(this.containerClassName).concat(i);
            ctnr.style.position = "relative";
            ctnr.style.display = "inline-block";
            ctnr.style.verticalAlign = "middle";
            ctnr.style.height = "32px";
            ctnr.style.lineHeight = "32px";
            ctnr.style.width = "28px";
            // 创建当前数字元素
            var currentDigit = document.createElement("div");
            currentDigit.className = this.digitClassName;
            currentDigit.style.position = "absolute";
            currentDigit.style.top = "0";
            currentDigit.style.left = "0";
            currentDigit.style.width = "100%";
            currentDigit.style.height = "100%";
            // 创建下一个数字元素
            var nextDigit = document.createElement("div");
            nextDigit.className = this.digitClassName;
            nextDigit.style.position = "absolute";
            nextDigit.style.top = "0";
            nextDigit.style.left = "0";
            nextDigit.style.width = "100%";
            nextDigit.style.height = "100%";
            nextDigit.style.transform = "translateY(100%)";
            ctnr.appendChild(currentDigit);
            ctnr.appendChild(nextDigit);
            this.digitContainers.unshift({
                element: ctnr,
                currentDigit: currentDigit,
                nextDigit: nextDigit,
                currentValue: 0,
                nextValue: 0,
            });
            this.node.appendChild(ctnr);
            this.beforeArr.push(0);
            if (!this.separator ||
                (!this.separateEvery && !this.separateOnly) ||
                i === digits - 1 ||
                ((digits - i) % this.separateEvery != 1 &&
                    digits - i - this.separateOnly != 1))
                continue;
            var sprtrStr = isstr(this.separator)
                ? this.separator
                : this.separator.shift();
            var separator = document.createElement("div");
            separator.className = this.separatorClassName;
            separator.style.display = "inline-block";
            separator.innerHTML = sprtrStr;
            this.node.appendChild(separator);
        }
        this._resize();
        window.addEventListener("resize", this._resizeHandler);
    };
    Flip.prototype._updateDigitContainer = function (container, currentValue, nextValue) {
        // 更新当前数字
        container.currentDigit.innerHTML = "".concat(this.systemArr[currentValue]);
        container.currentValue = currentValue;
        // 更新下一个数字
        container.nextDigit.innerHTML = "".concat(this.systemArr[nextValue]);
        container.nextValue = nextValue;
    };
    Flip.prototype._draw = function (_a) {
        var per = _a.per, alter = _a.alter, digit = _a.digit;
        var container = this.digitContainers[digit];
        if (!container)
            return;
        var from = this.beforeArr[digit];
        var to = this.afterArr[digit];
        // 计算当前应该显示的数字
        var currentValue = Math.floor(((per * alter + from) % 10) + 10) % 10;
        var nextValue = (currentValue + 1) % 10;
        // 更新数字内容
        this._updateDigitContainer(container, currentValue, nextValue);
        // 计算动画进度
        var progress = (per * alter + from) % 10;
        var normalizedProgress = progress - Math.floor(progress);
        // 应用动画
        if (normalizedProgress > 0) {
            // 显示下一个数字的动画
            container.currentDigit.style.transform = "translateY(".concat(-normalizedProgress * 100, "%)");
            container.nextDigit.style.transform = "translateY(".concat((1 - normalizedProgress) * 100, "%)");
        }
        else {
            // 重置位置
            container.currentDigit.style.transform = "translateY(0)";
            container.nextDigit.style.transform = "translateY(100%)";
        }
    };
    Flip.prototype._resize = function () {
        if (this.digitContainers.length > 0) {
            this.height = this.digitContainers[0].element.clientHeight;
            this.node.style.height = this.height + "px";
        }
        if (this.afterArr.length) {
            this.frame(1);
        }
        else {
            for (var d = 0, len = this.digitContainers.length; d < len; d += 1) {
                this._draw({
                    digit: d,
                    per: 1,
                    alter: ~~(this.from / Math.pow(10, d)),
                });
            }
        }
    };
    Flip.prototype.frame = function (per) {
        var temp = 0;
        for (var d = this.digitContainers.length - 1; d >= 0; d -= 1) {
            var alter = this.afterArr[d] - this.beforeArr[d];
            temp += alter;
            this._draw({
                digit: d,
                per: this.easeFn(per),
                alter: this.direct ? alter : temp,
            });
            temp *= 10;
        }
    };
    Flip.prototype.flipTo = function (_a) {
        var _this = this;
        var to = _a.to, _b = _a.duration, duration = _b === void 0 ? 0 : _b, easeFn = _a.easeFn, direct = _a.direct;
        if (easeFn)
            this.easeFn = easeFn;
        if (direct !== undefined)
            this.direct = direct;
        this.setSelect(to);
        var len = this.digitContainers.length;
        this.beforeArr = num2PadNumArr(this.from, len);
        this.afterArr = num2PadNumArr(to, len);
        var start = Date.now();
        var dur = duration * 1000 || this.duration;
        var tick = function () {
            var elapsed = Date.now() - start;
            _this.frame(elapsed / dur);
            if (elapsed < dur)
                requestAnimationFrame(tick);
            else {
                _this.from = to;
                _this.frame(1);
            }
        };
        requestAnimationFrame(tick);
    };
    Flip.prototype.setSelect = function (num) {
        var _this = this;
        var len = this.digitContainers.length;
        num2PadNumArr(num, len).forEach(function (n, digit) {
            var container = _this.digitContainers[digit];
            if (container) {
                _this._updateDigitContainer(container, n, (n + 1) % 10);
                container.currentDigit.style.transform = "translateY(0)";
                container.nextDigit.style.transform = "translateY(100%)";
            }
        });
    };
    Flip.prototype.destroy = function () {
        window.removeEventListener("resize", this._resizeHandler);
        // 清理所有容器
        this.digitContainers.forEach(function (container) {
            if (container.element.parentNode) {
                container.element.parentNode.removeChild(container.element);
            }
        });
        this.digitContainers = [];
    };
    return Flip;
}());
exports.Flip = Flip;
