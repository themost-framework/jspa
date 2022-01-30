import { SetCallbackMethod } from './CallbackMethod';

function PreLoad() {
    return SetCallbackMethod(PreLoad);
}

export {
    PreLoad
}