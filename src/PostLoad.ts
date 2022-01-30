import { SetCallbackMethod } from './CallbackMethod';

function PostLoad() {
    return SetCallbackMethod(PostLoad);
}

export {
    PostLoad
}