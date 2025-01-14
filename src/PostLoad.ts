import { DataContextBase } from '@themost/common';
import { SetCallbackMethod } from './CallbackMethod';
import { EntityConstructor } from './Entity';

function PostLoad() {
    return SetCallbackMethod(PostLoad);
}

declare interface PostLoadEvent {
    context?: DataContextBase,
    entityClass?: EntityConstructor<unknown>;
    emitter?: unknown;
    query?: unknown;
}

export {
    PostLoadEvent,
    PostLoad
}