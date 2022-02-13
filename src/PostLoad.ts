import { DataContextBase } from '@themost/common';
import { DataModelEvent, DataModelEventConverter, SetCallbackMethod } from './CallbackMethod';
import { EntityConstructor } from './Entity';
import { CallbackMethodAnnotation } from './EntityListener';

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