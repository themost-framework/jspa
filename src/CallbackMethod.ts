import {  CallbackMethodCollectionAnnotation, CallbackMethod } from './EntityListener';
import { SymbolTypeNotSupportedException } from './Errors';

function SetCallbackMethod(method: CallbackMethod): MethodDecorator {
    return (target, propertyKey, propertyDescriptor) => {
        if (typeof propertyKey === 'symbol') {
                    throw new SymbolTypeNotSupportedException();
                }
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
    event: (event: unknown, callback: (err?: Error) => void) => void;
}

export interface DataModelEventConverter {
    toEvent(callbackMethod: CallbackMethod): DataModelEvent;
}

export {
    SetCallbackMethod
}