import { DataContextBase, DataModelBase } from '@themost/common';
import { SetCallbackMethod } from './CallbackMethod';
import { EntityConstructor } from './Entity';

function PreInit() {
    return SetCallbackMethod(PreInit);
}

declare interface PreInitEvent {
    context?: DataContextBase,
    entityClass?: EntityConstructor<unknown>;
    model?: DataModelBase;
}

export {
    PreInitEvent,
    PreInit
}