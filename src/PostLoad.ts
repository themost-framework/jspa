import { DataContextBase } from '@themost/common';
import { SetCallbackMethod } from './CallbackMethod';
import { EntityConstructor } from './Entity';

function PostLoad() {
    return SetCallbackMethod(PostLoad);
}

declare interface PostLoadEvent {
    context?: DataContextBase,
    entityClass?: EntityConstructor<any>;
    emitter?: any;
    query?: any;
}

export {
    PostLoadEvent,
    PostLoad
}