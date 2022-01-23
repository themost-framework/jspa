import { InheritanceType } from './InheritanceType';

declare interface InheritanceAnnotation {
    strategy: InheritanceType
}

declare interface EntityInheritanceAnnotation {
    Inheritance?: InheritanceAnnotation;
}

function Inheritance(annotation?: InheritanceAnnotation) {
    return (target: any) => {
        const entityInheritance: EntityInheritanceAnnotation = target as EntityInheritanceAnnotation;
        entityInheritance.Inheritance = Object.assign({
            strategy: InheritanceType.Joined
        }, annotation);
    };
}

export {
    InheritanceAnnotation,
    EntityInheritanceAnnotation,
    Inheritance
}