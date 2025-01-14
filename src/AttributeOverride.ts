import { ColumnAnnotation } from './Column';

declare interface AttributeOverrideAnnotation {
    name: string;
    column: ColumnAnnotation;
}

declare interface EntityAttributeOverrideAnnotation {
    AttributeOverrides?: AttributeOverrideAnnotation[];
}

function AttributeOverride(annotation?: AttributeOverrideAnnotation): ClassDecorator {
    return (target) => {
        if (Object.prototype.hasOwnProperty.call(target, 'AttributeOverrides') === false) {
            Object.assign(target, {
                AttributeOverrides: []
            });
        }
        const entity = target as EntityAttributeOverrideAnnotation;
        entity.AttributeOverrides.push(annotation);
    };
}

export {
    AttributeOverrideAnnotation,
    EntityAttributeOverrideAnnotation,
    AttributeOverride
}