import { CascadeType } from './CascadeType';
import { ColumnAnnotation, EntityColumnAnnotation } from './Column';
import { FetchType } from './FetchType';
import { Permission, PermissionAnnotation } from './Permission';

declare type AnyConstructor<T> = new(...args: any[]) => T;

declare interface ManyToOneAnnotation extends PermissionAnnotation {
    cascadeType?: CascadeType;
    fetchType?: FetchType;
    optional?: boolean;
    targetEntity?: string | AnyConstructor<any>;
}

declare interface ManyToOneColumnAnnotation extends ColumnAnnotation {
    manyToOne?: ManyToOneAnnotation;
}

function ManyToOne(annotation?: ManyToOneAnnotation) {
    return (target: any, propertyKey: string) => {
        if (Object.prototype.hasOwnProperty.call(target.constructor, 'Column') === false) {
            Object.assign(target.constructor, {
                Column: new Map()
            });
        }
        const columns: EntityColumnAnnotation = target.constructor as EntityColumnAnnotation;
        // get value
        const value = Object.assign({
            fetchType: FetchType.Eager,
            optional: true
        } as ManyToOneAnnotation, annotation);
        Permission(annotation.privileges);
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