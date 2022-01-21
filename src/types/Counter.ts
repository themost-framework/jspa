export class Counter extends Number {
    constructor(value?: any) {
        super(value);
        if (Counter.isCounter(this.valueOf()) === false) {
            throw new TypeError('Expected a valid counter.');
        }
    }

    static isCounter(value?: any): boolean {
        return value != null && Number.isInteger(value);
    }
}