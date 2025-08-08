const maxLenNum = (aNum: string | number, bNum: string | number) =>
  (aNum > bNum ? aNum : bNum).toString().length;

const num2PadNumArr = (num: { toString: () => any }, len: any) => {
  const padLeftStr = (rawStr: string, lenNum: number): string =>
    rawStr.length < lenNum ? padLeftStr("0" + rawStr, lenNum) : rawStr;
  const str2NumArr = (rawStr: string) => rawStr.split("").map(Number);
  return str2NumArr(padLeftStr(num.toString(), len)).reverse();
};

const isstr = (any: any): any is string =>
  Object.prototype.toString.call(any) === "[object String]";

interface DigitContainer {
  element: HTMLElement;
  currentDigit: HTMLElement;
  nextDigit: HTMLElement;
  currentValue: number;
  nextValue: number;
}

interface FlipOptions {
  node: HTMLElement;
  from: number;
  to?: number;
  duration?: number;
  delay?: number;
  easeFn?: (pos: number) => number;
  systemArr?: Array<string | number>;
  direct?: boolean;
  separator?: string | string[];
  separateOnly?: number;
  separateEvery?: number;
  containerClassName?: string;
  digitClassName?: string;
  separatorClassName?: string;
}

export class Flip {
  private beforeArr: Array<number>;
  private afterArr: Array<number>;
  private digitContainers: Array<DigitContainer>;
  private duration: number;
  private systemArr: Array<string | number>;
  private easeFn: (pos: number) => number;
  from: number;
  to: number;
  private node: HTMLElement;
  private direct: boolean;
  private separator?: string | string[];
  private separateOnly: number;
  private separateEvery: number;
  private height?: number;
  private _resizeHandler: () => void;
  private containerClassName: string;
  private digitClassName: string;
  private separatorClassName: string;

  constructor({
    node,
    from = 0,
    to,
    duration = 0.5,
    delay,
    easeFn = (pos: number) =>
      (pos /= 0.5) < 1
        ? 0.5 * Math.pow(pos, 3)
        : 0.5 * (Math.pow(pos - 2, 3) + 2),
    systemArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    direct = true,
    separator,
    separateOnly = 0,
    separateEvery = 3,
    containerClassName = "ctnr",
    digitClassName = "digit",
    separatorClassName = "sprtr",
  }: FlipOptions) {
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
    if (to === undefined) return;
    if (delay) setTimeout(() => this.flipTo({ to: this.to }), delay * 1000);
    else this.flipTo({ to: this.to });
  }

  _initHTML(digits: number) {
    this.node.classList.add("number-flip");
    this.node.style.position = "relative";
    this.node.style.overflow = "hidden";

    for (let i = 0; i < digits; i += 1) {
      const ctnr = document.createElement("div");
      ctnr.className = `${this.containerClassName} ${this.containerClassName}${i}`;
      ctnr.style.position = "relative";
      ctnr.style.display = "inline-block";
      ctnr.style.verticalAlign = "middle";
      ctnr.style.height = "32px";
      ctnr.style.lineHeight = "32px";
      ctnr.style.width = "28px";

      // 创建当前数字元素
      const currentDigit = document.createElement("div");
      currentDigit.className = this.digitClassName;
      currentDigit.style.position = "absolute";
      currentDigit.style.top = "0";
      currentDigit.style.left = "0";
      currentDigit.style.width = "100%";
      currentDigit.style.height = "100%";

      // 创建下一个数字元素
      const nextDigit = document.createElement("div");
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
        currentDigit,
        nextDigit,
        currentValue: 0,
        nextValue: 0,
      });

      this.node.appendChild(ctnr);
      this.beforeArr.push(0);

      if (
        !this.separator ||
        (!this.separateEvery && !this.separateOnly) ||
        i === digits - 1 ||
        ((digits - i) % this.separateEvery != 1 &&
          digits - i - this.separateOnly != 1)
      )
        continue;
      const sprtrStr = isstr(this.separator)
        ? this.separator
        : (this.separator.shift() as string);
      const separator = document.createElement("div");
      separator.className = this.separatorClassName;
      separator.style.display = "inline-block";
      separator.innerHTML = sprtrStr;
      this.node.appendChild(separator);
    }
    this._resize();
    window.addEventListener("resize", this._resizeHandler);
  }

  _updateDigitContainer(
    container: DigitContainer,
    currentValue: number,
    nextValue: number
  ) {
    // 更新当前数字
    container.currentDigit.innerHTML = `${this.systemArr[currentValue]}`;
    container.currentValue = currentValue;

    // 更新下一个数字
    container.nextDigit.innerHTML = `${this.systemArr[nextValue]}`;
    container.nextValue = nextValue;
  }

  _draw({ per, alter, digit }: { per: number; alter: number; digit: number }) {
    const container = this.digitContainers[digit];
    if (!container) return;

    const from = this.beforeArr[digit];
    const to = this.afterArr[digit];

    // 计算当前应该显示的数字
    const currentValue = Math.floor(((per * alter + from) % 10) + 10) % 10;
    const nextValue = (currentValue + 1) % 10;

    // 更新数字内容
    this._updateDigitContainer(container, currentValue, nextValue);

    // 计算动画进度
    const progress = (per * alter + from) % 10;
    const normalizedProgress = progress - Math.floor(progress);

    // 应用动画
    if (normalizedProgress > 0) {
      // 显示下一个数字的动画
      container.currentDigit.style.transform = `translateY(${
        -normalizedProgress * 100
      }%)`;
      container.nextDigit.style.transform = `translateY(${
        (1 - normalizedProgress) * 100
      }%)`;
    } else {
      // 重置位置
      container.currentDigit.style.transform = "translateY(0)";
      container.nextDigit.style.transform = "translateY(100%)";
    }
  }

  _resize() {
    if (this.digitContainers.length > 0) {
      this.height = this.digitContainers[0].element.clientHeight;
      this.node.style.height = this.height + "px";
    }

    if (this.afterArr.length) {
      this.frame(1);
    } else {
      for (let d = 0, len = this.digitContainers.length; d < len; d += 1) {
        this._draw({
          digit: d,
          per: 1,
          alter: ~~(this.from / Math.pow(10, d)),
        });
      }
    }
  }

  frame(per: number) {
    let temp = 0;
    for (let d = this.digitContainers.length - 1; d >= 0; d -= 1) {
      const alter = this.afterArr[d] - this.beforeArr[d];
      temp += alter;
      this._draw({
        digit: d,
        per: this.easeFn(per),
        alter: this.direct ? alter : temp,
      });
      temp *= 10;
    }
  }

  flipTo({
    to,
    duration = 0,
    easeFn,
    direct,
  }: {
    to: number;
    duration?: number;
    easeFn?: (pos: number) => number;
    direct?: boolean;
  }) {
    if (easeFn) this.easeFn = easeFn;
    if (direct !== undefined) this.direct = direct;
    this.setSelect(to);
    const len = this.digitContainers.length;
    this.beforeArr = num2PadNumArr(this.from, len);
    this.afterArr = num2PadNumArr(to, len);
    const start = Date.now();
    const dur = duration * 1000 || this.duration;
    const tick = () => {
      const elapsed = Date.now() - start;
      this.frame(elapsed / dur);
      if (elapsed < dur) requestAnimationFrame(tick);
      else {
        this.from = to;
        this.frame(1);
      }
    };
    requestAnimationFrame(tick);
  }

  setSelect(num: any) {
    const len = this.digitContainers.length;
    num2PadNumArr(num, len).forEach((n: number, digit: number) => {
      const container = this.digitContainers[digit];
      if (container) {
        this._updateDigitContainer(container, n, (n + 1) % 10);
        container.currentDigit.style.transform = "translateY(0)";
        container.nextDigit.style.transform = "translateY(100%)";
      }
    });
  }

  destroy() {
    window.removeEventListener("resize", this._resizeHandler);
    // 清理所有容器
    this.digitContainers.forEach((container) => {
      if (container.element.parentNode) {
        container.element.parentNode.removeChild(container.element);
      }
    });
    this.digitContainers = [];
  }
}
