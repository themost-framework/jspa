import { DataContext } from '@themost/data';
import { CascadeType, Column, Entity, EntityListeners, FetchType, ManyToMany, PostInit, PostLoad, PreInit } from '@themost/jspa';
import { Account, AccountType } from './Account';
import { Group } from './Group';
import { OnUserRemoveListener } from './OnUserRemoveListener';
import { OnUserUpdateListener } from './OnUserUpdateListener';

@Entity()
@EntityListeners(OnUserUpdateListener, OnUserRemoveListener)
class User extends Account {
    @Column({
        nullable: false,
        updatable: false,
        insertable: false
    })
    public accountType?: number = AccountType.User;

    @ManyToMany({
        targetEntity: 'Group',
        cascadeType: CascadeType.Detach,
        fetchType: FetchType.Lazy,
        mappedBy: 'members'
    })
    public groups?: Group[];

    @PostLoad()
    onPostLoad() {
        //
    }

    @PreInit()
    static onPreInit(eventArgs: any) {
        // do nothing
    }

    @PostInit()
    static onPostInit(eventArgs: any) {
        // do nothing
    }

}

export {
    User
}
