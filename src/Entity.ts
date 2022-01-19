declare interface EntityAnnotation {
    name?: string;
    version?: string;
}

declare interface EntityProperty {
    Entity?: EntityAnnotation;
}

function Entity(annotation?: EntityAnnotation) {
    return (target: any) => {
        const entity = target as EntityProperty;
        entity.Entity = Object.assign({
            name: target.name
        }, annotation);
    };
}

export {
    EntityAnnotation,
    EntityProperty,
    Entity
}