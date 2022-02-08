import { DataModelEvent, DataModelEventConverter, SetCallbackMethod } from './CallbackMethod';
import { CallbackMethodAnnotation } from './EntityListener';

function PreRemove() {
    return SetCallbackMethod(PreRemove);
}

Object.assign(PreRemove, {
    toEvent: (callbackMethod: CallbackMethodAnnotation): DataModelEvent => {
        return {
            type: 'before.remove',
            event: (event: any, callback: (err?: Error) => void): void => {
                return callbackMethod.callback.bind(event.target)().then(() => {
                    return callback();
                }).catch((err: Error | any) => {
                    return callback(err);
                });
            }
        }
    }
} as DataModelEventConverter);

export {
    PreRemove
}