import { DataModelBase, SequentialEventEmitter } from '@themost/common';
import { PreInit, PostInit, EntityListenerCollectionAnnotation,
    CallbackMethodCollectionAnnotation, CallbackMethodAnnotation,
    PreLoadEvent, PostLoadEvent, PostLoad, PreLoad,
    PreRemove, PreRemoveEvent, PostRemoveEvent, PostRemove,
    PreInitEvent, PostInitEvent, PreUpdate, PreUpdateEvent,
    PostUpdate, PostUpdateEvent, PostPersistEvent, PrePersistEvent, PrePersist, PostPersist } from '@themost/jspa';

declare interface CallbackDataEventArgs {
    model: DataModelBase;
    target: any;
    state?: number;
    emitter?: any;
    query?: any;
    previous?: any;
    throwError?: boolean;
}

function inspectStaticCallbackOfType(CallbackType: any, entityClass: any): CallbackMethodAnnotation[] {
    const results: CallbackMethodAnnotation[] = [];
    const entityListenerCollection = entityClass as EntityListenerCollectionAnnotation;
    if (Array.isArray(entityListenerCollection.EntityListeners)) {
        entityListenerCollection.EntityListeners.forEach((entityListener) => {
            const entityCallbackCollection1 = entityListener as CallbackMethodCollectionAnnotation;
            if (Array.isArray(entityCallbackCollection1.CallbackMethods)) {
                const addResults = entityCallbackCollection1.CallbackMethods.filter((item) => {
                    return item.type === CallbackType;
                });
                results.push.apply(results, addResults);
            }
        });
    }
    return results;
}

function inspectCallbackOfType(CallbackType: any, entityClass: any): CallbackMethodAnnotation[] {
    const results: CallbackMethodAnnotation[] = [];
    const entityCallbackCollection1 = entityClass as CallbackMethodCollectionAnnotation;
    if (Array.isArray(entityCallbackCollection1.CallbackMethods)) {
        const addResults = entityCallbackCollection1.CallbackMethods.filter((item) => {
            return item.type === CallbackType;
        });
        results.push.apply(results, addResults);
    }
    return results;
}


function beforeUpgrade(event: CallbackDataEventArgs, callback: (err?: Error) => void): void {
    const EntityClass = event.model.getDataObjectType();
    const listenerCallbacks = inspectStaticCallbackOfType(PreInit, EntityClass);
    const eventEmitter = new SequentialEventEmitter();
    listenerCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('before.upgrade', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback({
                context: innerEvent.model.context,
                model: innerEvent.model,
                entityClass: EntityClass
            } as PreInitEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    const ownCallbacks = inspectCallbackOfType(PreInit, EntityClass);
    ownCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('before.upgrade', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback({
                context: innerEvent.model.context,
                model: innerEvent.model,
                entityClass: EntityClass
            } as PreInitEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    return eventEmitter.emit('before.upgrade', event, (err?: Error) => {
        return callback(err);
    });
}

function afterUpgrade(event: CallbackDataEventArgs, callback: (err?: Error) => void): void {
    const EntityClass = event.model.getDataObjectType();
    const listenerCallbacks = inspectStaticCallbackOfType(PostInit, EntityClass);
    const eventEmitter = new SequentialEventEmitter();
    listenerCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('after.upgrade', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback({
                context: innerEvent.model.context,
                model: innerEvent.model,
                entityClass: EntityClass
            } as PostInitEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    const ownCallbacks = inspectCallbackOfType(PostInit, EntityClass);
    ownCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('after.upgrade', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback({
                context: innerEvent.model.context,
                model: innerEvent.model,
                entityClass: EntityClass
            } as PostInitEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    return eventEmitter.emit('after.upgrade', event, (err?: Error) => {
        return callback(err);
    });
}

function beforeExecute(event: CallbackDataEventArgs, callback: (err?: Error) => void): void {
    const EntityClass = event.model.getDataObjectType();
    const listenerCallbacks = inspectStaticCallbackOfType(PreLoad, EntityClass);
    const eventEmitter = new SequentialEventEmitter();
    listenerCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('before.execute', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback({
                context: innerEvent.model.context,
                emitter: innerEvent.emitter,
                query: innerEvent.query,
                entityClass: EntityClass
            } as PreLoadEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    const ownCallbacks = inspectCallbackOfType(PreLoad, EntityClass);
    ownCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('before.execute', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback({
                context: event.model.context,
                emitter: event.emitter,
                query: event.query,
                entityClass: EntityClass
            } as PostLoadEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    return eventEmitter.emit('before.execute', event, (err?: Error) => {
        return callback(err);
    });
}

function afterExecute(event: CallbackDataEventArgs, callback: (err?: Error) => void): void {
    const EntityClass = event.model.getDataObjectType();
    const listenerCallbacks = inspectStaticCallbackOfType(PostLoad, EntityClass);
    const eventEmitter = new SequentialEventEmitter();
    listenerCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('after.execute', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback({
                context: innerEvent.model.context,
                emitter: innerEvent.emitter,
                query: innerEvent.query,
                entityClass: EntityClass
            } as PostLoadEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    const ownCallbacks = inspectCallbackOfType(PostLoad, EntityClass);
    ownCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('after.execute', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback({
                context: innerEvent.model.context,
                emitter: innerEvent.emitter,
                query: innerEvent.query,
                entityClass: EntityClass
            } as PostLoadEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    return eventEmitter.emit('after.execute', event, (err?: Error) => {
        return callback(err);
    });
}

function beforeUpdate(event: CallbackDataEventArgs, callback: (err?: Error) => void): void {
    const EntityClass = event.model.getDataObjectType();
    const listenerCallbacks = inspectStaticCallbackOfType(PreUpdate, EntityClass);
    const eventEmitter = new SequentialEventEmitter();
    listenerCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('before.save', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback({
                context: innerEvent.model.context,
                target: innerEvent.target,
                previous: innerEvent.previous,
                entityClass: EntityClass
            } as PreUpdateEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    const ownCallbacks = inspectCallbackOfType(PreUpdate, EntityClass);
    ownCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('before.save', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback.bind(innerEvent.target)({
                context: innerEvent.model.context,
                target: innerEvent.target,
                previous: innerEvent.previous,
                entityClass: EntityClass
            } as PreUpdateEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    return eventEmitter.emit('before.save', event, (err?: Error) => {
        return callback(err);
    });
}

function afterUpdate(event: CallbackDataEventArgs, callback: (err?: Error) => void): void {
    const EntityClass = event.model.getDataObjectType();
    const listenerCallbacks = inspectStaticCallbackOfType(PostUpdate, EntityClass);
    const eventEmitter = new SequentialEventEmitter();
    listenerCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('after.save', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback({
                context: innerEvent.model.context,
                target: innerEvent.target,
                previous: innerEvent.previous,
                entityClass: EntityClass
            } as PostUpdateEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    const ownCallbacks = inspectCallbackOfType(PostUpdate, EntityClass);
    ownCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('after.save', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback.bind(innerEvent.target)({
                context: innerEvent.model.context,
                target: innerEvent.target,
                previous: innerEvent.previous,
                entityClass: EntityClass
            } as PostUpdateEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    return eventEmitter.emit('after.save', event, (err?: Error) => {
        return callback(err);
    });
}

function beforeInsert(event: CallbackDataEventArgs, callback: (err?: Error) => void): void {
    const EntityClass = event.model.getDataObjectType();
    const listenerCallbacks = inspectStaticCallbackOfType(PrePersist, EntityClass);
    const eventEmitter = new SequentialEventEmitter();
    listenerCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('before.save', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback({
                context: innerEvent.model.context,
                target: innerEvent.target,
                model: innerEvent.model,
                entityClass: EntityClass
            } as PrePersistEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    const ownCallbacks = inspectCallbackOfType(PrePersist, EntityClass);
    ownCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('before.save', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback.bind(innerEvent.target)({
                context: innerEvent.model.context,
                target: innerEvent.target,
                model: innerEvent.model,
                entityClass: EntityClass
            } as PrePersistEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    return eventEmitter.emit('before.save', event, (err?: Error) => {
        return callback(err);
    });
}

function afterInsert(event: CallbackDataEventArgs, callback: (err?: Error) => void): void {
    const EntityClass = event.model.getDataObjectType();
    const listenerCallbacks = inspectStaticCallbackOfType(PostPersist, EntityClass);
    const eventEmitter = new SequentialEventEmitter();
    listenerCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('after.save', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback({
                context: innerEvent.model.context,
                target: innerEvent.target,
                model: innerEvent.model,
                entityClass: EntityClass
            } as PostPersistEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    const ownCallbacks = inspectCallbackOfType(PostPersist, EntityClass);
    ownCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('after.save', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback.bind(innerEvent.target)({
                context: innerEvent.model.context,
                target: innerEvent.target,
                model: innerEvent.model,
                entityClass: EntityClass
            } as PostPersistEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    return eventEmitter.emit('after.save', event, (err?: Error) => {
        return callback(err);
    });
}

function beforeSave(event: CallbackDataEventArgs, callback: (err?: Error) => void): void {
    if (event.state === 1) {
        return beforeInsert(event, callback);
    }
    return beforeUpgrade(event, callback);
}

function afterSave(event: CallbackDataEventArgs, callback: (err?: Error) => void): void {
    if (event.state === 1) {
        return afterInsert(event, callback);
    }
    return afterSave(event, callback);
}

function beforeRemove(event: CallbackDataEventArgs, callback: (err?: Error) => void): void {
    const EntityClass = event.model.getDataObjectType();
    const listenerCallbacks = inspectStaticCallbackOfType(PreRemove, EntityClass);
    const eventEmitter = new SequentialEventEmitter();
    listenerCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('before.remove', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback({
                context: innerEvent.model.context,
                target: innerEvent.target,
                model: event.model,
                entityClass: EntityClass
            } as PreRemoveEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    const ownCallbacks = inspectCallbackOfType(PreRemove, EntityClass);
    ownCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('before.remove', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback.bind(innerEvent.target)({
                context: innerEvent.model.context,
                target: innerEvent.target,
                model: event.model,
                entityClass: EntityClass
            } as PreRemoveEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    return eventEmitter.emit('before.remove', event, (err?: Error) => {
        return callback(err);
    });
}

function afterRemove(event: CallbackDataEventArgs, callback: (err?: Error) => void): void {
    const EntityClass = event.model.getDataObjectType();
    const listenerCallbacks = inspectStaticCallbackOfType(PostRemove, EntityClass);
    const eventEmitter = new SequentialEventEmitter();
    listenerCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('after.remove', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback({
                context: innerEvent.model.context,
                target: innerEvent.target,
                model: innerEvent.model,
                entityClass: EntityClass
            } as PostRemoveEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    const ownCallbacks = inspectCallbackOfType(PostRemove, EntityClass);
    ownCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('after.remove', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback.bind(innerEvent.target)({
                context: innerEvent.model.context,
                target: innerEvent.target,
                model: innerEvent.model,
                entityClass: EntityClass
            } as PostRemoveEvent).then(() => {
                return innerCallback();
            }).catch((error: Error) => {
                return innerCallback(error);
            });
        });
    });
    return eventEmitter.emit('after.remove', event, (err?: Error) => {
        return callback(err);
    });
}

export {
    beforeUpgrade,
    afterUpgrade,
    beforeSave,
    afterSave,
    beforeExecute,
    afterExecute,
    beforeRemove,
    afterRemove
}