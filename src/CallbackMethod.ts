import {  CallbackMethodCollectionAnnotation, CallbackMethod } from './EntityListener';

function SetCallbackMethod(method: CallbackMethod) {
    return (target: any, propertyKey: any, propertyDescriptor: any) => {
        if (Object.prototype.hasOwnProperty.call(target.constructor, 'CallbackMethods') === false) {
            Object.assign(target.constructor, {
                CallbackMethods: []
            } as CallbackMethodCollectionAnnotation);
        }
        const entityClass: CallbackMethodCollectionAnnotation = target.constructor as CallbackMethodCollectionAnnotation;
        entityClass.CallbackMethods.push({
            type: method,
            name: `${target.constructor.name}.${propertyKey}`,
            callback: propertyDescriptor.value
        });
    };
}

export interface DataModelEvent {
    type: string;
    event: (event: any, callback: (err?: Error) => void) => void;
}

export interface DataModelEventConverter {
    toEvent(callbackMethod: CallbackMethod): DataModelEvent;
}

export {
    SetCallbackMethod
}