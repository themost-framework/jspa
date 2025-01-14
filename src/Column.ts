import 'reflect-metadata';
import { EntityTypeAnnotation } from './Entity';
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
declare type AnyConstructor<T> = Function & { prototype: T };
declare interface ColumnAnnotation {
    name?: string;
    description?: string;
    nullable?: boolean;
    unique?: boolean;
    length?: number;
    precision?: number;
    scale?: number;
    insertable?: boolean;
    updatable?: boolean;
    type?: string | AnyConstructor<unknown>;
    additionalType?: string | AnyConstructor<unknown>;
    entity?: string;
}

declare interface EntityColumnAnnotation {
    Column?: Map<string, ColumnAnnotation>;
}

function Column(annotation?: ColumnAnnotation): PropertyDecorator {
    return (target, propertyKey: string) => {
        if (Object.prototype.hasOwnProperty.call(target.constructor, 'Column') === false) {
            Object.assign(target.constructor, {
                Column: new Map()
            });
        }
        const columns: EntityColumnAnnotation = target.constructor as EntityColumnAnnotation;
        const column = columns.Column.get(propertyKey);
        const value: ColumnAnnotation = Object.assign({
            name: propertyKey,
            nullable: true,
            insertable: true,
            updatable: true
        }, column, annotation);
        if (value.type == null) {
            // get metadata
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const r: { name?: string; prototype?: any } = Reflect.getMetadata('design:type', target, propertyKey);
            if (r && r.name) {
                value.type = r.name;
            }
        }
        if (value.entity == null) {
            const targetEntity = target.constructor as EntityTypeAnnotation;
            if (targetEntity.Entity) {
                value.entity = targetEntity.Entity.name;
            }
        }
        columns.Column.set(propertyKey, value);
      };
}

function Basic() {
    return Column();
}

export {
    AnyConstructor,
    ColumnAnnotation,
    EntityColumnAnnotation,
    Column,
    Basic
}