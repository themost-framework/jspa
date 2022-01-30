import { SetCallbackMethod } from './CallbackMethod';

function PreRemove() {
    return SetCallbackMethod(PreRemove);
}

export {
    PreRemove
}