import { DataContextBase, DataModelBase } from '@themost/common';
import { SetCallbackMethod } from './CallbackMethod';
import { EntityConstructor } from './Entity';

function PostPersist() {
    return SetCallbackMethod(PostPersist);
}

declare interface PostPersistEvent {
    context?: DataContextBase,
    entityClass?: EntityConstructor<any>;
    model?: DataModelBase;
    target?: any;
}

export {
    PostPersistEvent,
    PostPersist
}