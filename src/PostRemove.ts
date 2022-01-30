import { SetCallbackMethod } from './CallbackMethod';

function PostRemove() {
    return SetCallbackMethod(PostRemove);
}

export {
    PostRemove
}