import { DataContextBase, DataModelBase } from '@themost/common';
import { EntityColumnAnnotation, ColumnAnnotation } from './Column';
declare interface FormulaArgs {
    context: DataContextBase,
    model: DataModelBase,
    target: any
}
declare interface FormulaAnnotation {
    closure: (event: FormulaArgs) => any;
}

declare interface FormulaColumnAnnotation extends ColumnAnnotation {
    formula?: FormulaAnnotation;
}

declare type FormulaClosure<T> = (event?: FormulaArgs) => Promise<T>;

declare type FormulaSimpleClosure<T> = (event?: FormulaArgs) => T;

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
    FormulaArgs,
    FormulaClosure,
    FormulaSimpleClosure,
    FormulaAnnotation,
    FormulaColumnAnnotation,
    Formula
}