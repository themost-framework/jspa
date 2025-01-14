// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
declare type EntityListenerConstructor<T> = Function & { prototype: T };

declare type CallbackMethod = () => unknown;

declare interface CallbackMethodAnnotation {
    type?: CallbackMethod;
    name?: string;
    callback?: unknown;
}

declare interface CallbackMethodCollectionAnnotation {
    CallbackMethods?: CallbackMethodAnnotation[];
}

declare interface EntityListenerCollectionAnnotation {
    EntityListeners?: EntityListenerConstructor<unknown>[];
}


function EntityListeners(...value: EntityListenerConstructor<unknown>[]): ClassDecorator {
    return (target) => {
        if (Object.prototype.hasOwnProperty.call(target, 'EntityListeners') === false) {
            Object.assign(target, {
                EntityListeners: []
            });
        }
        const entityClass: EntityListenerCollectionAnnotation = target as EntityListenerCollectionAnnotation;
        entityClass.EntityListeners.push(...value);
    };
}

export {
    CallbackMethod,
    EntityListenerConstructor,
    CallbackMethodAnnotation,
    CallbackMethodCollectionAnnotation,
    EntityListenerCollectionAnnotation,
    EntityListeners
}
