import { SetCallbackMethod } from './CallbackMethod';

function PostPersist() {
    return SetCallbackMethod(PostPersist);
}

export {
    PostPersist
}