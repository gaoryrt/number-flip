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
}
export declare class Flip {
    private beforeArr;
    private afterArr;
    private ctnrArr;
    private duration;
    private systemArr;
    private easeFn;
    from: number;
    to: number;
    private _rawNode;
    private node;
    private direct;
    private separator?;
    private separateOnly;
    private separateEvery;
    private height?;
    constructor({ node, from, to, duration, delay, easeFn, systemArr, direct, separator, separateOnly, separateEvery, }: FlipOptions);
    _initHTML(digits: number): void;
    _draw({ per, alter, digit }: {
        per: number;
        alter: number;
        digit: number;
    }): void;
    _resize(): void;
    frame(per: number): void;
    flipTo({ to, duration, easeFn, direct, }: {
        to: number;
        duration?: number;
        easeFn?: () => any;
        direct?: boolean;
    }): void;
    setSelect(num: any): void;
    destroy(): void;
}
export {};
