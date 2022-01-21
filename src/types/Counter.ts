export class Counter extends Number {
    constructor(value?: any) {
        super(value);
        if (Counter.isValid(value) === false) {
            throw new TypeError('Expected a valid counter.');
        }
    }

    static isValid(value?: any): boolean {
        return value != null && Number.isInteger(value) && value > 0;
    }
}