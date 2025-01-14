import { CascadeType } from './CascadeType';
import { ColumnAnnotation, EntityColumnAnnotation, AnyConstructor } from './Column';
import { SymbolTypeNotSupportedException } from './Errors';
import { FetchType } from './FetchType';
import { Permission, PermissionAnnotation } from './Permission';

declare interface ManyToOneAnnotation extends PermissionAnnotation {
    cascadeType?: CascadeType;
    fetchType?: FetchType;
    optional?: boolean;
    targetEntity?: string | AnyConstructor<unknown>;
}

declare interface ManyToOneColumnAnnotation extends ColumnAnnotation {
    manyToOne?: ManyToOneAnnotation;
}

function ManyToOne(annotation?: ManyToOneAnnotation): PropertyDecorator {
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