import {
    CascadeType,
    Column,
    Entity,
    FetchType,
    Formula,
    JoinTable,
    ManyToMany,
    PostInit,
    PostInitEvent
} from '@themost/jspa';
import { Account, AccountType } from './Account';
import {DataModel} from '@themost/data';

@Entity()
class Group extends Account {
    @Formula(() => {
        return AccountType.Group;
    })
    @Column({
        nullable: false,
        updatable: false
    })
    public accountType?: number = AccountType.Group;

    @ManyToMany({
        targetEntity: 'Account',
        fetchType: FetchType.Lazy,
        cascadeType: CascadeType.Detach
    })
    @JoinTable({
        name: 'GroupMembers'
    })
    public members?: Account[];

    // noinspection JSUnusedLocalSymbols
    @PostInit()
    async onPostInit(event: PostInitEvent) {
        await event.model.silent().save([
            {
                name: 'Administrators',
                alternateName: 'administrators',
                accountType: AccountType.Group
            },
            {
                name: 'Users',
                alternateName: 'users',
                accountType: AccountType.Group
            },
            {
                name: 'Guests',
                alternateName: 'guests',
                accountType: AccountType.Group
            }
        ]);
    }
}

export {
    Group
}
