import { DataModelBase } from '@themost/common';
import { EntityColumnAnnotation, ColumnAnnotation } from './Column';
import { SymbolTypeNotSupportedException } from './Errors';

declare interface ValidationAnnotation {
    pattern?: string,
    patternMessage?: string;
    minValue?: unknown;
    maxValue?: unknown;
    minLength?: unknown;
    maxLength?: unknown;
    message?: string;
    validator?: (event: { model: DataModelBase, target: unknown, value: unknown }) => Promise<boolean>;
}

declare interface ColumnValidationAnnotation extends ColumnAnnotation {
    validation?: ValidationAnnotation;
}

function tryGetColumn(target: unknown, propertyKey: string) {
    if (Object.prototype.hasOwnProperty.call(target.constructor, 'Column') === false) {
        Object.assign(target.constructor, {
            Column: new Map()
        });
    }
    const columns: EntityColumnAnnotation = target.constructor as EntityColumnAnnotation;
    let column = columns.Column.get(propertyKey);
    if (column == null) {
        column = {
            name: propertyKey
        };
    }
    return column;
}

function trySetColumn(target: unknown, propertyKey: string, column: ColumnAnnotation) {
    if (Object.prototype.hasOwnProperty.call(target.constructor, 'Column') === false) {
        Object.assign(target.constructor, {
            Column: new Map()
        });
    }
    const columns: EntityColumnAnnotation = target.constructor as EntityColumnAnnotation;
    columns.Column.set(propertyKey, column);
}

function Pattern(pattern?: string, patternMessage?: string): PropertyDecorator {
    return (target, propertyKey) => {
        if (typeof propertyKey === 'symbol') {
            throw new SymbolTypeNotSupportedException();
        }
        // get column annotation
        const column = tryGetColumn(target, propertyKey);
        const value = {
            pattern,
            patternMessage
        };
        // assign value
        Object.assign(column, {
            validation: value
        } as ColumnValidationAnnotation);
        // set column annotation
        trySetColumn(target, propertyKey, column);
      };
}

function Size(minLength?: unknown, maxLength?: unknown, message?: string): PropertyDecorator {
    return (target, propertyKey) => {
        if (typeof propertyKey === 'symbol') {
            throw new SymbolTypeNotSupportedException();
        }
        // get column annotation
        const column = tryGetColumn(target, propertyKey);
        const value = {
            minLength,
            maxLength,
            message
        };
        // assign value
        Object.assign(column, {
            validation: value
        } as ColumnValidationAnnotation);
        // set column annotation
        trySetColumn(target, propertyKey, column);
      };
}

function Min(minValue?: unknown, message?: string): PropertyDecorator {
    return (target, propertyKey) => {
        if (typeof propertyKey === 'symbol') {
            throw new SymbolTypeNotSupportedException();
        }
        // get column annotation
        const column = tryGetColumn(target, propertyKey);
        const value = {
            minValue,
            message
        };
        // assign value
        Object.assign(column, {
            validation: value
        } as ColumnValidationAnnotation);
        // set column annotation
        trySetColumn(target, propertyKey, column);
      };
}

function Max(maxValue?: unknown, message?: string): PropertyDecorator {
    return (target, propertyKey) => {
        if (typeof propertyKey === 'symbol') {
            throw new SymbolTypeNotSupportedException();
        }
        // get column annotation
        const column = tryGetColumn(target, propertyKey);
        const value = {
            maxValue,
            message
        };
        // assign value
        Object.assign(column, {
            validation: value
        } as ColumnValidationAnnotation);
        // set column annotation
        trySetColumn(target, propertyKey, column);
      };
}

function Range(minValue: unknown, maxValue: unknown, message?: string): PropertyDecorator {
    return (target, propertyKey) => {
        if (typeof propertyKey === 'symbol') {
            throw new SymbolTypeNotSupportedException();
        }
        // get column annotation
        const column = tryGetColumn(target, propertyKey);
        const value = {
            minValue,
            maxValue,
            message
        };
        // assign value
        Object.assign(column, {
            validation: value
        } as ColumnValidationAnnotation);
        // set column annotation
        trySetColumn(target, propertyKey, column);
      };
}

function Validate(validator: (event: { model: DataModelBase, target: unknown, value: unknown }) => Promise<boolean>, message?: string): PropertyDecorator {
    return (target, propertyKey) => {
        if (typeof propertyKey === 'symbol') {
            throw new SymbolTypeNotSupportedException();
        }
        // get column annotation
        const column = tryGetColumn(target, propertyKey);
        const value = {
            validator,
            message
        };
        // assign value
        Object.assign(column, {
            validation: value
        } as ColumnValidationAnnotation);
        // set column annotation
        trySetColumn(target, propertyKey, column);
      };
}

export {
    Pattern,
    Size,
    Min,
    Max,
    Validate,
    Range,
    ColumnValidationAnnotation
}