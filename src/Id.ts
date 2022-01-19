declare interface IdAnnotation {
    name: string;
}

declare interface IdProperty {
    Id?: IdAnnotation;
}

function Id() {
    return (target: any, propertyKey: string) => {
        const id: IdProperty = target.constructor as IdProperty;
        id.Id = {
            name: propertyKey
        }
      };
}

export {
    IdAnnotation,
    IdProperty,
    Id
}