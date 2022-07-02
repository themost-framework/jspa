import { CascadeType, Column, Entity, EntityListeners, FetchType, ManyToMany, PostInit, PostInitEvent, PostLoad, PreInit, PreInitEvent } from '@themost/jspa';
import { Account, AccountType } from './Account';
import { Group } from './Group';

@Entity()
@EntityListeners()
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
        fetchType: FetchType.Lazy,
        mappedBy: 'members'
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
