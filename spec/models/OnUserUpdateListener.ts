import { PostLoad, PostUpdate, PreUpdate } from '@themost/jspa';

export class OnUserUpdateListener {
    @PreUpdate()
    async onPreUpdate(item: any) {
        //
    }
    @PostUpdate()
    async onPostUpdate(item: any) {
        //
    }
}