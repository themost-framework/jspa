import { SetCallbackMethod } from './CallbackMethod';

function PrePersist() {
    return SetCallbackMethod(PrePersist);
}

export {
    PrePersist
}