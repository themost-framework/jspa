import { PostRemove, PostRemoveEvent, PreRemove, PreRemoveEvent } from '@themost/jspa';

export class OnUserRemoveListener {
    // noinspection JSUnusedLocalSymbols
    @PreRemove()
    async onPreRemove(event: PreRemoveEvent) {
        //
    }
    // noinspection JSUnusedLocalSymbols
    @PostRemove()
    async onPostRemove(item: PostRemoveEvent) {
        //
    }
}