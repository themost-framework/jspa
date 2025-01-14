import { EntityConstructor } from './Entity';
import { SetCallbackMethod } from './CallbackMethod';
import { DataContextBase } from '@themost/common';

function PreLoad() {
    return SetCallbackMethod(PreLoad);
}

declare interface PreLoadEvent {
    context?: DataContextBase,
    entityClass?: EntityConstructor<unknown>;
    emitter?: unknown;
    query?: unknown;
}

export {
    PreLoadEvent,
    PreLoad
}