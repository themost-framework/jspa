import { DataContextBase, DataModelBase } from '@themost/common';
import { EntityConstructor } from './Entity';
import { SetCallbackMethod } from './CallbackMethod';

function PreRemove() {
    return SetCallbackMethod(PreRemove);
}


declare interface PreRemoveEvent {
    context?: DataContextBase,
    entityClass?: EntityConstructor<unknown>;
    model?: DataModelBase;
    target?: unknown;
}

export {
    PreRemoveEvent,
    PreRemove
}