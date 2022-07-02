import { PreInit, PostInit, PreInitEvent, PostInitEvent } from '@themost/jspa';

export class OnUserInitListener {
    // noinspection JSUnusedLocalSymbols
    @PreInit()
    async onPreInit(event: PreInitEvent) {
        //
    }
    // noinspection JSUnusedLocalSymbols
    @PostInit()
    async onPostInit(event: PostInitEvent) {
        //
    }
}