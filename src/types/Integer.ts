
function ifNull(value: any, defaultValue: any) {
    if (value == null) {
        return defaultValue;
    }
    return value;
}
/**
 * Integer data type is a 32-bit signed two's complement integer.
 */
export class Integer extends Number {
    constructor(value?: any) {
        super(Integer.isInteger(ifNull(value, 0)) ? ifNull(value, 0) : NaN);
    }
    static isInteger(value?: any) {
        return /^[+-]?\d+$/.test(value);
    }
}
/**
 * An integer containing only positive values (1,2,..)
 */
export class PositiveInteger extends Number {
    constructor(value?: any) {
        super(PositiveInteger.isPositiveInteger(ifNull(value, 1)) ? ifNull(value, 1) : NaN);
    }
    static isPositiveInteger(value?: any) {
        return /^[+]?[1-9][0-9]*$/.test(value);
    }
}
/**
 * An integer containing only non-positive values (..,-2,-1,0)
 */
export class NonPositiveInteger extends Number {
    constructor(value?: any) {
        super(NonPositiveInteger.isNonPositiveInteger(ifNull(value, 0)) ? ifNull(value, 0) : NaN);
    }
    static isNonPositiveInteger(value?: any) {
        return /^[-][0-9]*$/.test(value);
    }
}

/**
 * An integer containing only negative values (..,-2,-1)
 */
export class NegativeInteger extends Number {
    constructor(value?: any) {
        super(NegativeInteger.isNegativeInteger(ifNull(value, -1)) ? ifNull(value, -1) : NaN);
    }
    static isNegativeInteger(value?: any) {
        return /^[-][1-9][0-9]*$/.test(value);
    }
}
/**
 * An integer containing only non-negative values (0,1,2,..)
 */
export class NonNegativeInteger extends Number {
    constructor(value?: any) {
        super(NonNegativeInteger.isNonNegativeInteger(ifNull(value, 0)) ? ifNull(value, 0) : NaN);
    }
    static isNonNegativeInteger(value?: any) {
        return /^[+]?[0-9]*$/.test(value);
    }
}

