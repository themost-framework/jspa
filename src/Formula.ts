import { DataContext } from '@themost/data';
import { EntityColumnAnnotation, ColumnAnnotation } from './Column';

declare interface FormulaAnnotation {
    closure: (context: DataContext) => any;
}

declare interface FormulaColumnAnnotation extends ColumnAnnotation {
    formula?: FormulaAnnotation;
}

declare type FormulaClosure<T> = (context: DataContext) => T;

declare type FormulaSimpleClosure<T> = () => T;

function Formula<T>(closure: FormulaClosure<T> | FormulaSimpleClosure<T>) {
    return (target: any, propertyKey: string) => {
        const columns: EntityColumnAnnotation = target.constructor as EntityColumnAnnotation;
        if (columns.Column == null) {
            columns.Column = new Map();
        }
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