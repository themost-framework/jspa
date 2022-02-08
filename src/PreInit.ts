import { DataModelEvent, DataModelEventConverter, SetCallbackMethod } from './CallbackMethod';
import { CallbackMethodAnnotation } from './EntityListener';

function PreInit() {
    return SetCallbackMethod(PreInit);
}

Object.assign(PreInit, {
    toEvent: (callbackMethod: CallbackMethodAnnotation): DataModelEvent => {
        return {
            type: 'before.upgrade',
            event: (event: any, callback: (err?: Error) => void): void => {
                return callbackMethod.callback(event).then(() => {
                    return callback();
                }).catch((err: Error | any) => {
                    return callback(err);
                });
            }
        }
    }
} as DataModelEventConverter);

export {
    PreInit
}