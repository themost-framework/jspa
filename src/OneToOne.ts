import { CascadeType } from './CascadeType';
import { AnyConstructor, ColumnAnnotation, EntityColumnAnnotation } from './Column';
import { FetchType } from './FetchType';
import { EntityNotFoundException, SymbolTypeNotSupportedException } from './Errors';
import { Permission, PermissionAnnotation } from './Permission';
import { DataModelPrivilegeBase } from '@themost/common';

declare interface OneToOneAnnotation extends PermissionAnnotation {
    optional?: boolean;
    cascadeType?: CascadeType;
    fetchType?: FetchType;
    // tslint:disable-next-line: ban-types
    targetEntity?: string | AnyConstructor<unknown>;
    mappedBy?: string;
    privileges?: DataModelPrivilegeBase[];
}

declare interface OneToOneColumnAnnotation extends ColumnAnnotation {
    oneToOne?: OneToOneAnnotation;
}

function OneToOne(annotation?: OneToOneAnnotation): PropertyDecorator {
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
        } as OneToOneAnnotation, annotation);
        // get column
        let column = columns.Column.get(propertyKey);
        if (column == null) {
            column = {
                name: propertyKey
            };
        }
        // try to find target entity
        let targetEntity: string;
        if (typeof annotation.targetEntity === 'function') {
            targetEntity = annotation.targetEntity.name;
        } else if (typeof annotation.targetEntity === 'string') {
            targetEntity = annotation.targetEntity
        } else {
            // get type from reflect metadata
            const r: { name?: string; prototype?: unknown } = Reflect.getMetadata('design:type', target, propertyKey);
            if (r && r.name) {
                targetEntity = r.name;
            }
        }
        if (targetEntity == null) {
            throw new EntityNotFoundException();
        }
        Permission(annotation.privileges);
        // set value property
        Object.assign(column, {
            oneToOne: value,
            type: targetEntity
        } as OneToOneColumnAnnotation);
        // finally, set column annotation
        columns.Column.set(propertyKey, column);
      };
}

export {
    OneToOneAnnotation,
    OneToOneColumnAnnotation,
    OneToOne
}