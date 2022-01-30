import { PostLoad, PostUpdate, PreUpdate } from '@themost/jspa';

export class OnUserUpdateListener {
    @PreUpdate()
    onPreUpdate(entity: any) {
        //
    }
    @PostUpdate()
    onPostUpdate(entity: any) {
        //
    }
}