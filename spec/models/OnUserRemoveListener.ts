import { PostRemove, PostRemoveEvent, PreRemove, PreRemoveEvent } from '@themost/jspa';

export class OnUserRemoveListener {
    @PreRemove()
    async onPreRemove(event: PreRemoveEvent) {
        //
    }
    @PostRemove()
    async onPostRemove(item: PostRemoveEvent) {
        //
    }
}