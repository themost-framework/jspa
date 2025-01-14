import { DataContextBase, DataModelBase } from '@themost/common';
import { EntityConstructor } from '.';
import { SetCallbackMethod } from './CallbackMethod';

function PostRemove() {
    return SetCallbackMethod(PostRemove);
}

declare interface PostRemoveEvent {
    context?: DataContextBase,
    entityClass?: EntityConstructor<unknown>;
    model?: DataModelBase;
    target?: unknown;
}

export {
    PostRemoveEvent,
    PostRemove
}