declare interface EntityAnnotation {
    Entity?: boolean;
}
function Entity() {
    return (target: any) => {
        Object.assign(target, {
            Entity: true
        });
      };
}

export {
    EntityAnnotation,
    Entity
}