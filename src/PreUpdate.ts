import { DataContextBase, DataModelBase } from '@themost/common';
import { SetCallbackMethod } from './CallbackMethod';
import { EntityConstructor } from './Entity';

function PreUpdate() {
    return SetCallbackMethod(PreUpdate);
}

declare interface PreUpdateEvent {
    context?: DataContextBase,
    entityClass?: EntityConstructor<any>;
    model?: DataModelBase;
    target?: any;
    previous?: any;
}

export {
    PreUpdateEvent,
    PreUpdate
}