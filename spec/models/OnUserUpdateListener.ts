import { PostLoad, PostUpdate, PreUpdate } from '@themost/jspa';

export class OnUserUpdateListener {
    @PreUpdate()
    async onPreUpdate(entity: any) {
        //
    }
    @PostUpdate()
    async onPostUpdate(entity: any) {
        //
    }
}