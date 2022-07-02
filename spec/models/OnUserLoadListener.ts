import { PreLoad, PostLoad, PreLoadEvent, PostLoadEvent } from '@themost/jspa';

export class OnUserLoadListener {
    // noinspection JSUnusedLocalSymbols
    @PreLoad()
    async OnPreload(event: PreLoadEvent) {
        //
    }
    // noinspection JSUnusedLocalSymbols
    @PostLoad()
    async onPostLoad(event: PostLoadEvent) {
        //
    }
}