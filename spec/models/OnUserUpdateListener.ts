import { PostUpdate, PreUpdate } from '@themost/jspa';

export class OnUserUpdateListener {
    // noinspection JSUnusedLocalSymbols
    @PreUpdate()
    async onPreUpdate(item: any) {
        //
    }
    // noinspection JSUnusedLocalSymbols
    @PostUpdate()
    async onPostUpdate(item: any) {
        //
    }
}