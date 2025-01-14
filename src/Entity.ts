import { Permission, PermissionAnnotation } from './Permission';

declare interface EntityAnnotation extends PermissionAnnotation {
    name?: string;
    version?: string;
    abstract?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
declare type EntityConstructor<T> = Function & { prototype: T };

declare interface EntityTypeAnnotation {
    Entity?: EntityAnnotation;
}

function Entity(annotation?: EntityAnnotation): ClassDecorator {
    return (target) => {
        const entityType = target as EntityTypeAnnotation;
        let embeddable = false;
        if (entityType.Entity && entityType.Entity.name === target.name) {
            embeddable = (entityType.Entity as { embeddable: boolean }).embeddable;
        }
        entityType.Entity = Object.assign({
            name: target.name,
            version: '1.0.0'
        }, annotation);
        if (embeddable) {
            Object.assign(entityType.Entity, {
                embeddable
            });
        }
        // set privileges
        Permission(annotation && annotation.privileges);
    };
}

export {
    EntityConstructor,
    EntityAnnotation,
    EntityTypeAnnotation,
    Entity
}