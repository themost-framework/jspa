import { ColumnAnnotation, Column, EntityColumnAnnotation } from './Column';
import { Entity } from './Entity';

declare interface EmbeddedEntityAnnotation extends ColumnAnnotation {
    embedded?: boolean;
}

declare interface EmbeddedableEntityAnnotation extends ColumnAnnotation {
    embeddedable?: boolean;
}

function Embedded() {
    return (target: any, propertyKey: string) => {
        Column({
            name: propertyKey
        })(target, propertyKey);
        const columns: EntityColumnAnnotation = target.constructor as EntityColumnAnnotation;
        const column = columns.Column.get(propertyKey);
        Object.assign(column, {
            embedded: true
        } as EmbeddedEntityAnnotation);
        columns.Column.set(propertyKey, column);
    };
}

function Embeddedable() {
    return (target: any) => {
        Entity()(target);
        const entity: EmbeddedableEntityAnnotation = target as EmbeddedableEntityAnnotation;
        Object.assign(entity, {
            embeddedable: true
        } as EmbeddedableEntityAnnotation);
    };
}

export {
    EmbeddedEntityAnnotation,
    EmbeddedableEntityAnnotation,
    Embedded,
    Embeddedable
}