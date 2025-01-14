import { DataContextBase, DataModelBase } from '@themost/common';
import { SetCallbackMethod } from './CallbackMethod';
import { EntityConstructor } from './Entity';

function PreUpdate() {
    return SetCallbackMethod(PreUpdate);
}

declare interface PreUpdateEvent {
    context?: DataContextBase,
    entityClass?: EntityConstructor<unknown>;
    model?: DataModelBase;
    target?: unknown;
    previous?: unknown;
}

export {
    PreUpdateEvent,
    PreUpdate
}