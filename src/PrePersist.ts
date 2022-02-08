import { DataModelEvent, DataModelEventConverter, SetCallbackMethod } from './CallbackMethod';
import { CallbackMethodAnnotation } from './EntityListener';

function PrePersist() {
    return SetCallbackMethod(PrePersist);
}

Object.assign(PrePersist, {
    toEvent: (callbackMethod: CallbackMethodAnnotation): DataModelEvent => {
        return {
            type: 'before.save',
            event: (event: any, callback: (err?: Error) => void): void => {
                if (event.state !== 1) {
                    return callback();
                }
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
    PrePersist
}