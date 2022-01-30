import { SetCallbackMethod } from './CallbackMethod';

function PreUpdate() {
    return SetCallbackMethod(PreUpdate);
}

export {
    PreUpdate
}