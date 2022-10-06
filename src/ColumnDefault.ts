import { DataContextBase, DataModelBase } from '@themost/common';
import { EntityColumnAnnotation, ColumnAnnotation } from './Column';

declare interface ColumnDefaultArgs {
    context: DataContextBase,
    model: DataModelBase,
    target: any
}

declare interface ColumnDefaultAnnotation {
    closure: (event: ColumnDefaultArgs) => any;
}

declare interface ColumnDefaultValueAnnotation extends ColumnAnnotation {
    columnDefault?: ColumnDefaultAnnotation;
}

declare type ColumnDefaultClosure<T> = (event?: ColumnDefaultArgs) => Promise<T>;

declare type ColumnDefaultSimpleClosure<T> = (event?: ColumnDefaultArgs) => T;

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
    ColumnDefaultArgs,
    ColumnDefaultClosure,
    ColumnDefaultSimpleClosure,
    ColumnDefaultAnnotation,
    ColumnDefaultValueAnnotation,
    ColumnDefault
}