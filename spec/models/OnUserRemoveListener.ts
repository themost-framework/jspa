import { PostRemove, PreRemove } from '@themost/jspa';

export class OnUserRemoveListener {
    @PreRemove()
    onPreRemove(entity: any) {
        //
    }
    @PostRemove()
    onPostRemove(entity: any) {
        //
    }
}