"use strict";
var NumberFlip = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // number-flip.ts
  var number_flip_exports = {};
  __export(number_flip_exports, {
    Flip: () => Flip
  });
  var digitOf = (num) => Number(num).toString().length;
  var maxLenNum = (aNum, bNum) => Math.max(digitOf(aNum), digitOf(bNum));
  var num2PadNumArr = (num, len) => {
    const padLeftStr = (rawStr, lenNum) => rawStr.length < lenNum ? padLeftStr("0" + rawStr, lenNum) : rawStr;
    const str2NumArr = (rawStr) => rawStr.split("").map(Number);
    const raw = num.toString();
    const padded = raw.length < len ? padLeftStr(raw, len) : raw;
    return str2NumArr(padded.slice(-len)).reverse();
  };
  var num2DigitArr = (num) => Number(num).toString().split("").map(Number).reverse();
  var widthCapAt = (neededDigits) => Math.pow(10, neededDigits) - 1;
  var effectiveFromAt = (flipFrom, neededDigits) => Math.min(flipFrom, widthCapAt(neededDigits));
  var effectiveToAt = (flipFrom, to, neededDigits) => {
    const widthCap = widthCapAt(neededDigits);
    return flipFrom < to ? Math.min(to, widthCap) : to;
  };
  var visibleDigitsAt = (per, before, after, easeFn) => {
    const easedPer = easeFn(per);
    let significant = 1;
    for (let d = 0; d < before.length; d += 1) {
      const alter = after[d] - before[d];
      const from = before[d];
      const modNum = ((easedPer * alter + from) % 10 + 10) % 10;
      if (modNum !== 0 || alter !== 0 && easedPer > 0 && easedPer < 1) {
        significant = Math.max(significant, d + 1);
      }
    }
    return significant;
  };
  var isstr = (any) => Object.prototype.toString.call(any) === "[object String]";
  var Flip = class {
    constructor({
      node,
      from = 0,
      to,
      duration = 0.5,
      delay,
      easeFn = (pos) => (pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 3) : 0.5 * (Math.pow(pos - 2, 3) + 2),
      systemArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      direct = true,
      separator,
      separateOnly = 0,
      separateEvery = 3,
      containerClassName = "ctnr",
      digitClassName = "digit",
      separatorClassName = "sprtr"
    }) {
      this._resizeHandler = this._resize.bind(this);
      this.beforeArr = [];
      this.afterArr = [];
      this.ctnrArr = [];
      this.duration = duration * 1e3;
      this.systemArr = systemArr;
      this.easeFn = easeFn;
      this.from = from;
      this.to = to || 0;
      this.node = node;
      this.direct = direct;
      this.separator = separator;
      this.separatorOriginal = Array.isArray(separator) ? [...separator] : separator;
      this.separateOnly = separateOnly;
      this.separateEvery = separateOnly ? 0 : separateEvery;
      this.containerClassName = containerClassName;
      this.digitClassName = digitClassName;
      this.separatorClassName = separatorClassName;
      this._initHTML(digitOf(this.from));
      this.setSelect(this.from);
      if (to === void 0) return;
      if (delay) setTimeout(() => this.flipTo({ to: this.to }), delay * 1e3);
      else this.flipTo({ to: this.to });
    }
    _initHTML(digits) {
      this.node.classList.add("number-flip");
      this.node.style.position = "relative";
      this.node.style.overflow = "hidden";
      this._buildDigits(digits);
      this._resize();
      window.addEventListener("resize", this._resizeHandler);
    }
    _buildDigits(digits) {
      let sprtrIdx = 0;
      for (let i = 0; i < digits; i += 1) {
        const ctnr = document.createElement("div");
        ctnr.className = `${this.containerClassName} ${this.containerClassName}${i}`;
        ctnr.style.position = "relative";
        ctnr.style.display = "inline-block";
        ctnr.style.verticalAlign = "top";
        [...this.systemArr, this.systemArr[0]].forEach((i2) => {
          const child = document.createElement("div");
          child.className = this.digitClassName;
          child.innerHTML = `${i2}`;
          ctnr.appendChild(child);
        });
        this.ctnrArr.unshift(ctnr);
        this.node.appendChild(ctnr);
        this.beforeArr.push(0);
        if (!this.separatorOriginal || !this.separateEvery && !this.separateOnly || i === digits - 1 || (digits - i) % this.separateEvery != 1 && digits - i - this.separateOnly != 1)
          continue;
        const sprtrStr = isstr(this.separatorOriginal) ? this.separatorOriginal : this.separatorOriginal[sprtrIdx++];
        const separator = document.createElement("div");
        separator.className = this.separatorClassName;
        separator.style.display = "inline-block";
        separator.innerHTML = sprtrStr;
        this.node.appendChild(separator);
      }
    }
    _rebuildDigits(digits) {
      while (this.node.firstChild) this.node.removeChild(this.node.firstChild);
      this.ctnrArr = [];
      this.beforeArr = [];
      this.afterArr = [];
      this._buildDigits(digits);
      this._resize();
    }
    _syncVisibleDigits(visible, fullBefore, fullAfter) {
      if (visible !== this.ctnrArr.length) {
        this._rebuildDigits(visible);
      }
      this.beforeArr = fullBefore.slice(0, visible);
      this.afterArr = fullAfter.slice(0, visible);
    }
    _draw({ per, alter, digit }) {
      const newHeight = this.ctnrArr[0].clientHeight / (this.systemArr.length + 1);
      if (newHeight && this.height !== newHeight) this.height = newHeight;
      const from = this.beforeArr[digit];
      const modNum = ((per * alter + from) % 10 + 10) % 10;
      const translateY = `translateY(${-modNum * (this.height || 0)}px)`;
      this.ctnrArr[digit].style.webkitTransform = translateY;
      this.ctnrArr[digit].style.transform = translateY;
    }
    _resize() {
      this.height = this.ctnrArr[0].clientHeight / (this.systemArr.length + 1);
      this.node.style.height = this.height + "px";
      if (this.afterArr.length) this.frame(1);
      else
        for (let d = 0, len = this.ctnrArr.length; d < len; d += 1)
          this._draw({
            digit: d,
            per: 1,
            alter: ~~(this.from / Math.pow(10, d))
          });
    }
    frame(per) {
      let temp = 0;
      for (let d = this.ctnrArr.length - 1; d >= 0; d -= 1) {
        const alter = this.afterArr[d] - this.beforeArr[d];
        temp += alter;
        this._draw({
          digit: d,
          per: this.easeFn(per),
          alter: this.direct ? alter : temp
        });
        temp *= 10;
      }
    }
    flipTo({
      to,
      duration = 0,
      easeFn,
      direct
    }) {
      if (easeFn) this.easeFn = easeFn;
      if (direct !== void 0) this.direct = direct;
      const flipFrom = this.from;
      const maxLen = maxLenNum(flipFrom, to);
      const fullBefore = num2PadNumArr(flipFrom, maxLen);
      const fullAfter = num2PadNumArr(to, maxLen);
      if (this.direct) {
        this._syncVisibleDigits(
          visibleDigitsAt(0, fullBefore, fullAfter, this.easeFn),
          fullBefore,
          fullAfter
        );
      } else if (this.ctnrArr.length !== digitOf(flipFrom)) {
        this._rebuildDigits(digitOf(flipFrom));
      }
      this.setSelect(to);
      const start = Date.now();
      const dur = duration * 1e3 || this.duration;
      const tick = () => {
        const elapsed = Date.now() - start;
        const rawPer = Math.min(elapsed / dur, 1);
        if (this.direct) {
          this._syncVisibleDigits(
            visibleDigitsAt(rawPer, fullBefore, fullAfter, this.easeFn),
            fullBefore,
            fullAfter
          );
        } else {
          const easedPer = this.easeFn(rawPer);
          const currentValue = Math.round(
            flipFrom + (to - flipFrom) * easedPer
          );
          const neededDigits = digitOf(currentValue);
          if (neededDigits !== this.ctnrArr.length) {
            this._rebuildDigits(neededDigits);
          }
          const effectiveFrom = effectiveFromAt(flipFrom, neededDigits);
          const effectiveTo = effectiveToAt(flipFrom, to, neededDigits);
          this.beforeArr = num2PadNumArr(effectiveFrom, neededDigits);
          this.afterArr = num2PadNumArr(effectiveTo, neededDigits);
        }
        this.frame(rawPer);
        if (elapsed < dur) requestAnimationFrame(tick);
        else {
          this.from = to;
          const finalDigits = digitOf(to);
          if (finalDigits !== this.ctnrArr.length) {
            this._rebuildDigits(finalDigits);
          }
          this.beforeArr = num2DigitArr(this.from);
          this.afterArr = [...this.beforeArr];
          this.frame(1);
        }
      };
      requestAnimationFrame(tick);
    }
    setSelect(num) {
      const len = this.ctnrArr.length;
      num2PadNumArr(num, len).forEach((n, digit) => {
        for (let i = 0; i < this.ctnrArr[digit].childNodes.length; i += 1) {
          const el = this.ctnrArr[digit].childNodes[i];
          el.style.userSelect = i === n ? "auto" : "none";
        }
      });
    }
    destroy() {
      window.removeEventListener("resize", this._resizeHandler);
    }
  };
  var nodeProcess = globalThis.process;
  var _a, _b;
  if ((_b = (_a = nodeProcess == null ? void 0 : nodeProcess.argv) == null ? void 0 : _a[1]) == null ? void 0 : _b.endsWith("number-flip.ts")) {
    if (num2PadNumArr(1e3, 1).length !== 1) throw new Error("truncate to len");
    if (num2PadNumArr(1e3, 1)[0] !== 0) throw new Error("ones of 1000");
    if (maxLenNum(99, 1e3) !== 4) throw new Error("maxLenNum");
    if (digitOf(0) !== 1) throw new Error("digitOf zero");
    const valueAt = (from, to, p) => Math.round(from + (to - from) * p);
    if (digitOf(valueAt(1, 1e3, 9 / 999)) !== 2) throw new Error("expand at 10");
    if (digitOf(valueAt(1, 1e3, 99 / 999)) !== 3) throw new Error("expand at 100");
    if (digitOf(valueAt(1e3, 1, 1 / 999)) !== 3) throw new Error("shrink at 999");
    if (num2DigitArr(99).join() !== "9,9") throw new Error("no leading zero");
    if (num2DigitArr(999).join() !== "9,9,9") throw new Error("shrink digits");
    const linear = (p) => p;
    const fb1 = num2PadNumArr(1, 4);
    const fa1 = num2PadNumArr(1e3, 4);
    if (visibleDigitsAt(0, fb1, fa1, linear) !== 1) throw new Error("direct no lead 0");
    if (visibleDigitsAt(1, fb1, fa1, linear) !== 4) throw new Error("direct end digits");
    if (effectiveToAt(99, 1e4, 3) !== 999) throw new Error("expand effectiveTo cap");
    const after99to100 = num2PadNumArr(effectiveToAt(99, 100, 3), 3);
    if (after99to100[2] !== 1) throw new Error("expand hundreds to 1");
    if (effectiveFromAt(1e4, 4) !== 9999) throw new Error("shrink effectiveFrom cap");
    const beforeShrink = num2PadNumArr(effectiveFromAt(1e4, 4), 4);
    if (beforeShrink.join() !== "9,9,9,9") throw new Error("shrink before not 9999");
    const afterShrink = num2PadNumArr(effectiveToAt(1e4, 9, 4), 4);
    if (beforeShrink.join() === afterShrink.join()) throw new Error("shrink before/after differ");
    let temp = 0;
    let hasAlter = false;
    for (let d = beforeShrink.length - 1; d >= 0; d -= 1) {
      temp += afterShrink[d] - beforeShrink[d];
      if (temp !== 0) hasAlter = true;
      temp *= 10;
    }
    if (!hasAlter) throw new Error("shrink has alter");
  }
  return __toCommonJS(number_flip_exports);
})();
