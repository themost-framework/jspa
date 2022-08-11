import { DataContextBase } from '@themost/common';
import { EntityColumnAnnotation, ColumnAnnotation } from './Column';

declare interface ColumnDefaultAnnotation {
    closure: (context: DataContextBase) => any;
}

declare interface ColumnDefaultValueAnnotation extends ColumnAnnotation {
    columnDefault?: ColumnDefaultAnnotation;
}

declare type ColumnDefaultClosure<T> = (context: DataContextBase) => T;

declare type ColumnDefaultSimpleClosure<T> = () => T;

function ColumnDefault<T>(closure: ColumnDefaultClosure<T> | ColumnDefaultSimpleClosure<T>) {
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
            columnDefault: {
                closure
            }
        } as ColumnDefaultValueAnnotation);
        // finally, set column annotation
        columns.Column.set(propertyKey, column);
      };
}

export {
    ColumnDefaultClosure,
    ColumnDefaultSimpleClosure,
    ColumnDefaultAnnotation,
    ColumnDefaultValueAnnotation,
    ColumnDefault
}