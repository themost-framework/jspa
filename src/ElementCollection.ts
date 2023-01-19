import { CascadeType } from './CascadeType';
import { ColumnAnnotation, EntityColumnAnnotation } from './Column';
import { FetchType } from './FetchType';
import { Permission, PermissionAnnotation } from './Permission';
import { DataModelPrivilegeBase } from '@themost/common';
declare type AnyConstructor<T> = new(...args: any[]) => T;

declare interface ElementCollectionAnnotation extends PermissionAnnotation {
    optional?: boolean,
    fetchType?: FetchType;
    targetClass?: string | AnyConstructor<any>;
    privileges?: DataModelPrivilegeBase[];
}

declare interface ElementCollectionColumnAnnotation extends ColumnAnnotation {
    elementCollection?: ElementCollectionAnnotation;
}

function ElementCollection(annotation?: ElementCollectionAnnotation) {
    return (target: any, propertyKey: string) => {
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const r: { name?: string; prototype?: any } = Reflect.getMetadata('design:type', target, propertyKey);
            if (r && r.name) {
                targetClass = r.name;
            }
        }
        Permission(annotation.privileges)(value);
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