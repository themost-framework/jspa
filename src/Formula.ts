import { DataContextBase } from '@themost/common';
import { EntityColumnAnnotation, ColumnAnnotation } from './Column';

declare interface FormulaAnnotation {
    closure: (context: DataContextBase) => any;
}

declare interface FormulaColumnAnnotation extends ColumnAnnotation {
    formula?: FormulaAnnotation;
}

declare type FormulaClosure<T> = (context: DataContextBase) => T;

declare type FormulaSimpleClosure<T> = () => T;

function Formula<T>(closure: FormulaClosure<T> | FormulaSimpleClosure<T>) {
    return (target: any, propertyKey: string) => {
        if (Object.prototype.hasOwnProperty.call(target.constructor, 'Column') === false) {
            Object.assign(target.constructor, {
                Column: new Map()
            });
        }
        const columns: EntityColumnAnnotation = target.constructor as EntityColumnAnnotation;
        // get column
        let column = columns.Column.get(propertyKey);
        if (column == null) {
            column = {
                name: propertyKey
            };
        }
        // set value property
        Object.assign(column, {
            formula: {
                closure
            }
        } as FormulaColumnAnnotation);
        // finally, set column annotation
        columns.Column.set(propertyKey, column);
      };
}

export {
    FormulaClosure,
    FormulaSimpleClosure,
    FormulaAnnotation,
    FormulaColumnAnnotation,
    Formula
}