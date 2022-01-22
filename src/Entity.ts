declare interface EntityAnnotation {
    name?: string;
    version?: string;
}

declare interface EntityTypeAnnotation {
    Entity?: EntityAnnotation;
}

function Entity(annotation?: EntityAnnotation) {
    return (target: any) => {
        const entity = target as EntityTypeAnnotation;
        entity.Entity = Object.assign({
            name: target.name,
            version: '1.0.0'
        }, annotation);
    };
}

export {
    EntityAnnotation,
    EntityTypeAnnotation,
    Entity
}