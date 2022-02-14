import { DataContextBase, DataModelBase } from '@themost/common';
import { DataModelEvent, DataModelEventConverter, SetCallbackMethod } from './CallbackMethod';
import { EntityConstructor } from './Entity';
import { CallbackMethodAnnotation } from './EntityListener';

function PrePersist() {
    return SetCallbackMethod(PrePersist);
}

declare interface PrePersistEvent {
    context?: DataContextBase,
    entityClass?: EntityConstructor<any>;
    model?: DataModelBase;
    target?: any;
}

export {
    PrePersistEvent,
    PrePersist
}