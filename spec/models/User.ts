import { CascadeType, Column, Entity, EntityListeners, FetchType, JoinTable, ManyToMany, PostInit, PostInitEvent, PostLoad, PreInit, PreInitEvent } from '@themost/jspa';
import { Account, AccountType } from './Account';
import { Group } from './Group';
import { OnUserInitListener } from './OnUserInitListener';
import { OnUserRemoveListener } from './OnUserRemoveListener';
import { OnUserUpdateListener } from './OnUserUpdateListener';

@Entity()
@EntityListeners(OnUserUpdateListener, OnUserRemoveListener, OnUserInitListener)
class User extends Account {
    @Column({
        nullable: false,
        updatable: false,
        insertable: false
    })
    public accountType?: AccountType = AccountType.User;

    @ManyToMany({
        targetEntity: 'Group',
        cascadeType: CascadeType.Detach,
        fetchType: FetchType.Lazy
    })
    @JoinTable({
        name: 'GroupMembers',
        joinColumns: [
            {
                name: 'object',
                referencedColumnName: 'id'
            }
        ],
        inverseJoinColumns: [
            {
                name: 'value',
                referencedColumnName: 'id'
            }
        ]
    })
    public groups?: Group[];

    @PostLoad()
    onPostLoad() {
        //
    }

    // noinspection JSUnusedLocalSymbols
    @PreInit()
    static onPreInit(event: PreInitEvent) {
        //
    }

    // noinspection JSUnusedLocalSymbols
    @PostInit()
    static onPostInit(event: PostInitEvent) {
        //
    }

}

export {
    User
}
