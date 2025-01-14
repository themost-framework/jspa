import { DataContextBase, DataModelBase } from '@themost/common';
import { SetCallbackMethod } from './CallbackMethod';
import { EntityConstructor } from './Entity';

function PostInit() {
    return SetCallbackMethod(PostInit);
}

declare interface PostInitEvent {
    context?: DataContextBase,
    entityClass?: EntityConstructor<unknown>;
    model?: DataModelBase;
}

export {
    PostInitEvent,
    PostInit
}