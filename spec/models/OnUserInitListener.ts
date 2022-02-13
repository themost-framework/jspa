import { DataContextBase } from '@themost/common';
import { PreInit, PostInit, EntityListenerConstructor, PreInitEvent, PostInitEvent } from '@themost/jspa';

export class OnUserInitListener {
    @PreInit()
    async onPreInit(event: PreInitEvent) {
        //
    }
    @PostInit()
    async onPostInit(event: PostInitEvent) {
        //
    }
}