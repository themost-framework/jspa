import { DataModelEvent, DataModelEventConverter, SetCallbackMethod } from './CallbackMethod';
import { CallbackMethodAnnotation } from './EntityListener';

function PreLoad() {
    return SetCallbackMethod(PreLoad);
}

Object.assign(PreLoad, {
    toEvent: (callbackMethod: CallbackMethodAnnotation): DataModelEvent => {
        return {
            type: 'before.execute',
            event: (event: any, callback: (err?: Error) => void): void => {
                return callbackMethod.callback(event.target).then(() => {
                    return callback();
                }).catch((err: Error | any) => {
                    return callback(err);
                });
            }
        }
    }
} as DataModelEventConverter);

export {
    PreLoad
}