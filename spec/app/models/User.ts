import { CascadeType, Column, Entity, EntityListeners, FetchType, Formula, JoinTable, ManyToMany, OneToOne, PostInit, PostInitEvent, PostLoad } from '@themost/jspa';
import { Account, AccountType } from './Account';
import { ExternalAccount } from './ExternalAccount';

@Entity()
@EntityListeners()
class User extends Account {
    @Column({
        nullable: false,
        updatable: false,
        insertable: true
    })
    @Formula(() => AccountType.User)
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
    public groups?: Account[];

    @OneToOne({
        cascadeType: CascadeType.Remove,
        fetchType: FetchType.Lazy,
        optional: true,
        targetEntity: ExternalAccount
    })
    @JoinTable({
        name: 'ExternalAccounts',
        joinColumns: [
            {
                name: 'user',
                referencedColumnName: 'id'
            }
        ],
        inverseJoinColumns: [
            {
                name: 'account',
                referencedColumnName: 'id'
            }
        ]
    })
    public externalAccount: ExternalAccount

    @PostLoad()
    async onPostLoad() {
        //
    }

    // noinspection JSUnusedLocalSymbols
    @PostInit()
    async onPostInit(event: PostInitEvent) {
        const count = await event.model.asQueryable().silent().count();
        if (count) {
            return;
        }
        await event.model.silent().save([
            {
                name: 'anonymous',
                alternateName: 'anonymous',
                accountType: AccountType.User,
                groups: [
                    {
                        name: 'Guests'
                    }
                ]
            }
        ]);
    }

}

export {
    User
}
