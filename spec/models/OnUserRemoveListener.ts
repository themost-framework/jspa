import { PostRemove, PreRemove } from '@themost/jspa';

export class OnUserRemoveListener {
    @PreRemove()
    async onPreRemove(item: any) {
        //
    }
    @PostRemove()
    async onPostRemove(item: any) {
        //
    }
}