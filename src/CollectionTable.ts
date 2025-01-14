import { ColumnAnnotation, EntityColumnAnnotation } from './Column';
import { SymbolTypeNotSupportedException } from './Errors';
import { JoinColumnAnnotation } from './JoinColumn';

declare interface CollectionTableAnnotation {
    catalog?: string;
    foreignKey?: string;
    joinColumns?: JoinColumnAnnotation[];
    inverseJoinColumns?: JoinColumnAnnotation[];
    name: string;
    schema?: string;
}

declare interface CollectionTableColumnAnnotation extends ColumnAnnotation {
    joinTable?: CollectionTableAnnotation;
}

function CollectionTable(annotation?: CollectionTableAnnotation): PropertyDecorator {
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
            joinTable: annotation
        } as CollectionTableColumnAnnotation);
        // finally, set column annotation
        columns.Column.set(propertyKey, column);
    };
}

export {
    CollectionTableAnnotation,
    CollectionTableColumnAnnotation,
    CollectionTable
}