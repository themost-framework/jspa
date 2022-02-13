import { DataContextBase, DataModelBase } from '@themost/common';
import { SetCallbackMethod } from './CallbackMethod';
import { EntityConstructor } from './Entity';

function PostInit() {
    return SetCallbackMethod(PostInit);
}

declare interface PostInitEvent {
    context?: DataContextBase,
    entityClass?: EntityConstructor<any>;
    model?: DataModelBase;
}

export {
    PostInitEvent,
    PostInit
}