import { DataContextBase, DataModelBase, SequentialEventEmitter } from '@themost/common';
import { PreInit, PostInit, EntityListenerCollectionAnnotation, CallbackMethodCollectionAnnotation, CallbackMethodAnnotation, PreLoadEvent, PostLoadEvent, PostLoad, PreLoad } from '@themost/jspa';

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
        eventEmitter.on('before.upgrade', (event1: CallbackDataEventArgs, callback1: (err?: Error) => void) => {
            listenerCallback.callback(event1.model.context, EntityClass).then(() => {
                return callback1();
            }).catch((error: Error) => {
                return callback1(error);
            });
        });
    });
    const ownCallbacks = inspectCallbackOfType(PreInit, EntityClass);
    ownCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('before.upgrade', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback(innerEvent.model.context).then(() => {
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
        eventEmitter.on('after.upgrade', (event1: CallbackDataEventArgs, callback1: (err?: Error) => void) => {
            listenerCallback.callback(event1.model.context, EntityClass).then(() => {
                return callback1();
            }).catch((error: Error) => {
                return callback1(error);
            });
        });
    });
    const ownCallbacks = inspectCallbackOfType(PreInit, EntityClass);
    ownCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('after.upgrade', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
            listenerCallback.callback(innerEvent.model.context).then(() => {
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
        eventEmitter.on('before.execute', (event1: CallbackDataEventArgs, callback1: (err?: Error) => void) => {
            listenerCallback.callback({
                context: event.model.context,
                emitter: event.emitter,
                query: event.query,
                entityClass: EntityClass
            } as PreLoadEvent).then(() => {
                return callback1();
            }).catch((error: Error) => {
                return callback1(error);
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
        eventEmitter.on('after.execute', (event1: CallbackDataEventArgs, callback1: (err?: Error) => void) => {
            listenerCallback.callback({
                context: event.model.context,
                emitter: event.emitter,
                query: event.query,
                entityClass: EntityClass
            } as PreLoadEvent).then(() => {
                return callback1();
            }).catch((error: Error) => {
                return callback1(error);
            });
        });
    });
    const ownCallbacks = inspectCallbackOfType(PostLoad, EntityClass);
    ownCallbacks.forEach((listenerCallback) => {
        eventEmitter.on('after.execute', (innerEvent: CallbackDataEventArgs, innerCallback: (err?: Error) => void) => {
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
    return eventEmitter.emit('after.execute', event, (err?: Error) => {
        return callback(err);
    });
}

function beforeSave(event: CallbackDataEventArgs, callback: (err?: Error) => void): void {
    return callback();
}

function afterSave(event: CallbackDataEventArgs, callback: (err?: Error) => void): void {
    return callback();
}

function beforeRemove(eventArgs: CallbackDataEventArgs, callback: (err?: Error) => void): void {
    return callback();
}

function afterRemove(eventArgs: CallbackDataEventArgs, callback: (err?: Error) => void): void {
    return callback();
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