import { DataModelEvent, DataModelEventConverter, SetCallbackMethod } from './CallbackMethod';
import { CallbackMethodAnnotation } from './EntityListener';

function PostInit() {
    return SetCallbackMethod(PostInit);
}

Object.assign(PostInit, {
    toEvent: (callbackMethod: CallbackMethodAnnotation): DataModelEvent => {
        return {
            type: 'after.upgrade',
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
    PostInit
}