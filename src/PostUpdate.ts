import { DataModelEvent, DataModelEventConverter, SetCallbackMethod } from './CallbackMethod';
import { CallbackMethodAnnotation } from './EntityListener';

function PostUpdate() {
    return SetCallbackMethod(PostUpdate);
}

Object.assign(PostUpdate, {
    toEvent: (callbackMethod: CallbackMethodAnnotation): DataModelEvent => {
        return {
            type: 'after.save',
            event: (event: any, callback: (err?: Error) => void): void => {
                if (event.state !== 2) {
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
    PostUpdate
}