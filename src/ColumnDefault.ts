import { DataContextBase, DataModelBase } from '@themost/common';
import { EntityColumnAnnotation, ColumnAnnotation } from './Column';
import { SymbolTypeNotSupportedException } from './Errors';

declare interface ColumnDefaultArgs {
    context: DataContextBase,
    model: DataModelBase,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: any
}

declare interface ColumnDefaultAnnotation {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    closure: (event: ColumnDefaultArgs) => any;
}

declare interface ColumnDefaultValueAnnotation extends ColumnAnnotation {
    columnDefault?: ColumnDefaultAnnotation;
}

declare type ColumnDefaultClosure<T> = (event?: ColumnDefaultArgs) => Promise<T>;

declare type ColumnDefaultSimpleClosure<T> = (event?: ColumnDefaultArgs) => T;

function ColumnDefault<T>(closure: ColumnDefaultClosure<T> | ColumnDefaultSimpleClosure<T>): PropertyDecorator {
    return (target, propertyKey) => {
        if (typeof propertyKey === 'symbol') {
            throw new SymbolTypeNotSupportedException();
        }
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