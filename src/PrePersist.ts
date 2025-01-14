import { DataContextBase, DataModelBase } from '@themost/common';
import { SetCallbackMethod } from './CallbackMethod';
import { EntityConstructor } from './Entity';

function PrePersist() {
    return SetCallbackMethod(PrePersist);
}

declare interface PrePersistEvent {
    context?: DataContextBase,
    entityClass?: EntityConstructor<unknown>;
    model?: DataModelBase;
    target?: unknown;
}

export {
    PrePersistEvent,
    PrePersist
}