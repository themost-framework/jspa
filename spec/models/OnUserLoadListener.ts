import { PreLoad, PostLoad, PreLoadEvent, PostLoadEvent } from '@themost/jspa';

export class OnUserLoadListener {
    @PreLoad()
    async OnPreload(event: PreLoadEvent) {
        //
    }
    @PostLoad()
    async onPostLoad(event: PostLoadEvent) {
        //
    }
}