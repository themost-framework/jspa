import { ColumnAnnotation, Column, EntityColumnAnnotation } from './Column';
import { Entity, EntityAnnotation } from './Entity';
import { SymbolTypeNotSupportedException } from './Errors';

declare interface EmbeddedEntityAnnotation extends ColumnAnnotation {
    embedded?: boolean;
}

declare interface EmbeddableEntityAnnotation extends EntityAnnotation {
    embeddable?: boolean;
}

declare interface  EmbeddableEntityTypeAnnotation {
    Entity?: EmbeddableEntityAnnotation;
}

function Embedded(): PropertyDecorator {
    return (target, propertyKey) => {
        if (typeof propertyKey === 'symbol') {
            throw new SymbolTypeNotSupportedException();
        }
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

function Embeddable(): ClassDecorator {
    return (target) => {
        Entity({
            embeddable: true
        } as EmbeddableEntityAnnotation)(target);
    };
}

export {
    EmbeddedEntityAnnotation,
    EmbeddableEntityAnnotation,
    EmbeddableEntityTypeAnnotation,
    Embedded,
    Embeddable
}