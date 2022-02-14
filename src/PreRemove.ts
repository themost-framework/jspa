import { DataContextBase, DataModelBase } from '@themost/common';
import { EntityConstructor } from './Entity';
import { SetCallbackMethod } from './CallbackMethod';

function PreRemove() {
    return SetCallbackMethod(PreRemove);
}


declare interface PreRemoveEvent {
    context?: DataContextBase,
    entityClass?: EntityConstructor<any>;
    model?: DataModelBase;
    target?: any;
}

export {
    PreRemoveEvent,
    PreRemove
}