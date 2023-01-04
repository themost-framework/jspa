import { ColumnAnnotation, Column, EntityColumnAnnotation } from './Column';
import { Entity, EntityAnnotation } from './Entity';

declare interface EmbeddedEntityAnnotation extends ColumnAnnotation {
    embedded?: boolean;
}

declare interface EmbeddableEntityAnnotation extends EntityAnnotation {
    embeddable?: boolean;
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

function Embeddable() {
    return (target: any) => {
        Entity({
            embeddable: true
        } as EmbeddableEntityAnnotation)(target);
    };
}

export {
    EmbeddedEntityAnnotation,
    EmbeddableEntityAnnotation,
    Embedded,
    Embeddable
}