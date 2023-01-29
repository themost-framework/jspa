import { DataModelBase } from '@themost/common';
import { EntityColumnAnnotation, ColumnAnnotation } from './Column';

declare interface ValidationAnnotation {
    pattern?: string,
    patternMessage?: string;
    minValue?: any;
    maxValue?: any;
    minLength?: any;
    maxLength?: any;
    message?: string;
    validator?: (event: { model: DataModelBase, target: any, value: any }) => Promise<boolean>;
}

declare interface ColumnValidationAnnotation extends ColumnAnnotation {
    validation?: ValidationAnnotation;
}

function tryGetColumn(target: any, propertyKey: string) {
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

function trySetColumn(target: any, propertyKey: string, column: ColumnAnnotation) {
    if (Object.prototype.hasOwnProperty.call(target.constructor, 'Column') === false) {
        Object.assign(target.constructor, {
            Column: new Map()
        });
    }
    const columns: EntityColumnAnnotation = target.constructor as EntityColumnAnnotation;
    columns.Column.set(propertyKey, column);
}

function Pattern(pattern?: string, patternMessage?: string) {
    return (target: any, propertyKey: string) => {
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

function Size(minLength?: any, maxLength?: any, message?: string) {
    return (target: any, propertyKey: string) => {
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

function Min(minValue?: any, message?: string) {
    return (target: any, propertyKey: string) => {
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

function Max(maxValue?: any, message?: string) {
    return (target: any, propertyKey: string) => {
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

function Range(minValue: any, maxValue: any, message?: string) {
    return (target: any, propertyKey: string) => {
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

function Validate(validator: (event: { model: DataModelBase, target: any, value: any }) => Promise<boolean>, message?: string) {
    return (target: any, propertyKey: string) => {
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