import { CascadeType } from './CascadeType';
import { ColumnAnnotation, ColumnProperty } from './Column';
import { FetchType } from './FetchType';

declare interface ManyToOneAnnotation {
    cascadeType?: CascadeType;
    fetchType?: FetchType;
    optional?: boolean;
    targetEntity?: any;
}

declare interface ManyToOneColumnAnnotation extends ColumnAnnotation {
    manyToOne?: ManyToOneAnnotation;
}

function ManyToOne(annotation?: ManyToOneAnnotation) {
    return (target: any, propertyKey: string) => {
        const columns: ColumnProperty = target.constructor as ColumnProperty;
        if (columns.Column == null) {
            columns.Column = new Map();
        }
        // get value
        const value = Object.assign({
            fetchType: FetchType.Eager,
            optional: true
        } as ManyToOneAnnotation, annotation);
        // get column
        let column = columns.Column.get(propertyKey);
        if (column == null) {
            column = {
                name: propertyKey
            };
        }
        // set value property
        Object.assign(column, {
            manyToOne: value
        } as ManyToOneColumnAnnotation);
        // finally, set column annotation
        columns.Column.set(propertyKey, column);
      };
}

export {
    ManyToOneAnnotation,
    ManyToOneColumnAnnotation,
    ManyToOne
}