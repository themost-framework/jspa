import { ColumnAnnotation, EntityColumnAnnotation } from './Column';
import { SymbolTypeNotSupportedException } from './Errors';
import { JoinColumnAnnotation } from './JoinColumn';

declare interface JoinTableAnnotation {
    catalog?: string;
    foreignKey?: string;
    indexes?: { columnList:string[] }[];
    inverseForeignKey?: string;
    inverseJoinColumns?: JoinColumnAnnotation[];
    joinColumns?: JoinColumnAnnotation[];
    name: string;
    schema?: string;
    uniqueConstraints?: { columnName:string[] }[];
}

declare interface JoinTableColumnAnnotation extends ColumnAnnotation {
    joinTable?: JoinTableAnnotation;
}

function JoinTable(annotation?: JoinTableAnnotation): PropertyDecorator {
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
        } as JoinTableColumnAnnotation);
        // finally, set column annotation
        columns.Column.set(propertyKey, column);
    };
}

export {
    JoinTableAnnotation,
    JoinTableColumnAnnotation,
    JoinTable
}