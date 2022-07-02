declare type EntityListenerConstructor<T> = new(...args: any[]) => T;

declare type CallbackMethod = () => any;

declare interface CallbackMethodAnnotation {
    type?: CallbackMethod;
    name?: string;
    callback?: any;
}

declare interface CallbackMethodCollectionAnnotation {
    CallbackMethods?: CallbackMethodAnnotation[];
}

declare interface EntityListenerCollectionAnnotation {
    EntityListeners?: EntityListenerConstructor<any>[];
}


function EntityListeners(...value: EntityListenerConstructor<any>[]) {
    return (target: any) => {
        if (Object.prototype.hasOwnProperty.call(target, 'EntityListeners') === false) {
            Object.assign(target, {
                EntityListeners: []
            });
        }
        const entityClass: EntityListenerCollectionAnnotation = target as EntityListenerCollectionAnnotation;
        entityClass.EntityListeners.push.apply(entityClass.EntityListeners, value);
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
