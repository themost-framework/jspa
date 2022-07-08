import { CascadeType } from './CascadeType';
import { ColumnAnnotation, EntityColumnAnnotation } from './Column';
import { FetchType } from './FetchType';
import { EntityNotFoundException } from './Errors';
declare type AnyConstructor<T> = new(...args: any[]) => T;

declare interface ManyToManyAnnotation {
    cascadeType?: CascadeType;
    fetchType?: FetchType;
    // tslint:disable-next-line: ban-types
    targetEntity?: string | AnyConstructor<any>;
    mappedBy?: string;
}

declare interface ManyToManyColumnAnnotation extends ColumnAnnotation {
    manyToMany?: ManyToManyAnnotation;
}

function ManyToMany(annotation?: ManyToManyAnnotation) {
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
        } as ManyToManyAnnotation, annotation);
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const r: { name?: string; prototype?: any } = Reflect.getMetadata('design:type', target, propertyKey);
            if (r && r.name) {
                targetEntity = r.name;
            }
        }
        if (targetEntity == null) {
            throw new EntityNotFoundException();
        }
        // set value property
        Object.assign(column, {
            manyToMany: value,
            type: targetEntity
        } as ManyToManyColumnAnnotation);
        // finally, set column annotation
        columns.Column.set(propertyKey, column);
      };
}

export {
    ManyToManyAnnotation,
    ManyToManyColumnAnnotation,
    ManyToMany
}