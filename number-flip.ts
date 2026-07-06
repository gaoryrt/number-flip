const digitOf = (num: string | number) => Number(num).toString().length;
const maxLenNum = (aNum: string | number, bNum: string | number) =>
  Math.max(digitOf(aNum), digitOf(bNum));

const num2PadNumArr = (num: { toString: () => any }, len: any) => {
  const padLeftStr = (rawStr: string, lenNum: number): string =>
    rawStr.length < lenNum ? padLeftStr("0" + rawStr, lenNum) : rawStr;
  const str2NumArr = (rawStr: string) => rawStr.split("").map(Number);
  return str2NumArr(padLeftStr(num.toString(), len)).reverse();
};

const isstr = (any: any): any is string =>
  Object.prototype.toString.call(any) === "[object String]";

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
  private ctnrArr: Array<HTMLElement>;
  private duration: number;
  private systemArr: Array<string | number>;
  private easeFn: (pos: number) => number;
  from: number;
  to: number;
  private node: HTMLElement;
  private direct: boolean;
  private separator?: string | string[];
  private separatorOriginal?: string | string[];
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
    this.ctnrArr = [];
    this.duration = duration * 1000;
    this.systemArr = systemArr;
    this.easeFn = easeFn;
    this.from = from;
    this.to = to || 0;
    this.node = node;
    this.direct = direct;
    this.separator = separator;
    this.separatorOriginal = Array.isArray(separator)
      ? [...separator]
      : separator;
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
    this._buildDigits(digits);
    this._resize();
    window.addEventListener("resize", this._resizeHandler);
  }

  _buildDigits(digits: number) {
    let sprtrIdx = 0;
    for (let i = 0; i < digits; i += 1) {
      const ctnr = document.createElement("div");
      ctnr.className = `${this.containerClassName} ${this.containerClassName}${i}`;
      ctnr.style.position = "relative";
      ctnr.style.display = "inline-block";
      ctnr.style.verticalAlign = "top";
      [...this.systemArr, this.systemArr[0]].forEach((i) => {
        const child = document.createElement("div");
        child.className = this.digitClassName;
        child.innerHTML = `${i}`;
        ctnr.appendChild(child);
      });
      this.ctnrArr.unshift(ctnr);
      this.node.appendChild(ctnr);
      this.beforeArr.push(0);
      if (
        !this.separatorOriginal ||
        (!this.separateEvery && !this.separateOnly) ||
        i === digits - 1 ||
        ((digits - i) % this.separateEvery != 1 &&
          digits - i - this.separateOnly != 1)
      )
        continue;
      const sprtrStr = isstr(this.separatorOriginal)
        ? this.separatorOriginal
        : (this.separatorOriginal[sprtrIdx++] as string);
      const separator = document.createElement("div");
      separator.className = this.separatorClassName;
      separator.style.display = "inline-block";
      separator.innerHTML = sprtrStr;
      this.node.appendChild(separator);
    }
  }

  _rebuildDigits(digits: number) {
    while (this.node.firstChild) this.node.removeChild(this.node.firstChild);
    this.ctnrArr = [];
    this.beforeArr = [];
    this.afterArr = [];
    this._buildDigits(digits);
    this._resize();
  }

  _draw({ per, alter, digit }: { per: number; alter: number; digit: number }) {
    const newHeight =
      this.ctnrArr[0].clientHeight / (this.systemArr.length + 1);
    if (newHeight && this.height !== newHeight) this.height = newHeight;
    const from = this.beforeArr[digit];
    const modNum = (((per * alter + from) % 10) + 10) % 10;
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
          alter: ~~(this.from / Math.pow(10, d)),
        });
  }

  frame(per: number) {
    let temp = 0;
    for (let d = this.ctnrArr.length - 1; d >= 0; d -= 1) {
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
    easeFn?: () => any;
    direct?: boolean;
  }) {
    if (easeFn) this.easeFn = easeFn;
    if (direct !== undefined) this.direct = direct;

    const flipDigits = maxLenNum(this.from, to);
    this._rebuildDigits(flipDigits);

    this.setSelect(to);
    const len = this.ctnrArr.length;
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
        const finalDigits = digitOf(to);
        if (finalDigits !== this.ctnrArr.length) {
          this._rebuildDigits(finalDigits);
          this.beforeArr = num2PadNumArr(this.from, finalDigits);
          this.afterArr = [...this.beforeArr];
          this.frame(1);
        }
      }
    };
    requestAnimationFrame(tick);
  }

  setSelect(num: any) {
    const len = this.ctnrArr.length;
    num2PadNumArr(num, len).forEach((n: number, digit: number) => {
      for (let i = 0; i < this.ctnrArr[digit].childNodes.length; i += 1) {
        const el = this.ctnrArr[digit].childNodes[i] as HTMLElement;
        el.style.userSelect = i === n ? "auto" : "none";
      }
    });
  }

  destroy() {
    window.removeEventListener("resize", this._resizeHandler);
  }
}

// ponytail: 位数数组长度自检 — ts-node number-flip.ts 可跑
const nodeProcess = (globalThis as { process?: { argv?: string[] } }).process;
if (nodeProcess?.argv?.[1]?.endsWith("number-flip.ts")) {
  const len = 2;
  if (num2PadNumArr(1000, len).length !== 4) throw new Error("pad without truncate");
  if (maxLenNum(99, 1000) !== 4) throw new Error("maxLenNum");
  if (digitOf(0) !== 1) throw new Error("digitOf zero");
}
