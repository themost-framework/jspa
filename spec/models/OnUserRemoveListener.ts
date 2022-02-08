import { PostRemove, PreRemove } from '@themost/jspa';

export class OnUserRemoveListener {
    @PreRemove()
    async onPreRemove(entity: any) {
        //
    }
    @PostRemove()
    async onPostRemove(entity: any) {
        //
    }
}