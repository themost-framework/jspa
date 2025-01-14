import { ColumnAnnotation, EntityColumnAnnotation, AnyConstructor } from './Column';
import { SymbolTypeNotSupportedException } from './Errors';
import { FetchType } from './FetchType';
import { Permission, PermissionAnnotation } from './Permission';
import { DataModelPrivilegeBase } from '@themost/common';

declare interface ElementCollectionAnnotation extends PermissionAnnotation {
    optional?: boolean,
    fetchType?: FetchType;
    targetClass?: string | AnyConstructor<unknown>;
    privileges?: DataModelPrivilegeBase[];
}

declare interface ElementCollectionColumnAnnotation extends ColumnAnnotation {
    elementCollection?: ElementCollectionAnnotation;
}

function ElementCollection(annotation?: ElementCollectionAnnotation): PropertyDecorator {
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
            fetchType: FetchType.Lazy,
            optional: true
        } as ElementCollectionAnnotation, annotation);
        // get column
        let column = columns.Column.get(propertyKey);
        if (column == null) {
            column = {
                name: propertyKey
            };
        }
        // try to find target entity
        let targetClass: string;
        if (typeof annotation.targetClass === 'function') {
            targetClass = annotation.targetClass.name;
        } else if (typeof annotation.targetClass === 'string') {
            targetClass = annotation.targetClass
        } else {
            // get type from reflect metadata
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const r: { name?: string; prototype?: any } = Reflect.getMetadata('design:type', target, propertyKey);
            if (r && r.name) {
                targetClass = r.name;
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Permission(annotation.privileges)(value as any);
        // set value property
        Object.assign(column, {
            elementCollection: value
        } as ElementCollectionAnnotation);
        if (targetClass) {
            Object.assign(column, {
                type: targetClass
            });
        }
        // finally, set column annotation
        columns.Column.set(propertyKey, column);
      };
}

export {
    ElementCollectionAnnotation,
    ElementCollectionColumnAnnotation,
    ElementCollection
}