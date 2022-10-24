import { Permission, PermissionAnnotation } from './Permission';

declare interface EntityAnnotation extends PermissionAnnotation {
    name?: string;
    version?: string;
    abstract?: boolean;
}

declare type EntityConstructor<T> = new(...args: any[]) => T;

declare interface EntityTypeAnnotation {
    Entity?: EntityAnnotation;
}

function Entity(annotation?: EntityAnnotation) {
    return (target: any) => {
        const entityType = target as EntityTypeAnnotation;
        entityType.Entity = Object.assign({
            name: target.name,
            version: '1.0.0'
        }, annotation);
        Permission(annotation && annotation.privileges);
    };
}

export {
    EntityConstructor,
    EntityAnnotation,
    EntityTypeAnnotation,
    Entity
}