import { DataContextBase, DataModelBase } from '@themost/common';
import { SetCallbackMethod } from './CallbackMethod';
import { EntityConstructor } from './Entity';

function PostUpdate() {
    return SetCallbackMethod(PostUpdate);
}

declare interface PostUpdateEvent {
    context?: DataContextBase,
    entityClass?: EntityConstructor<any>;
    model?: DataModelBase;
    target?: any;
    previous?: any;
}

export {
    PostUpdateEvent,
    PostUpdate
}