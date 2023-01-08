import 'reflect-metadata';
import { EntityTypeAnnotation } from './Entity';

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
    type?: string;
    entity?: string;
}

declare interface EntityColumnAnnotation {
    Column?: Map<string, ColumnAnnotation>;
}

function Column(annotation?: ColumnAnnotation) {
    return (target: any, propertyKey: string) => {
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
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
    ColumnAnnotation,
    EntityColumnAnnotation,
    Column,
    Basic
}