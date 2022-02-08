import { DataModelEvent, DataModelEventConverter, SetCallbackMethod } from './CallbackMethod';
import { CallbackMethodAnnotation } from './EntityListener';

function PostLoad() {
    return SetCallbackMethod(PostLoad);
}

Object.assign(PostLoad, {
    toEvent: (callbackMethod: CallbackMethodAnnotation): DataModelEvent => {
        return {
            type: 'after.execute',
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
    PostLoad
}