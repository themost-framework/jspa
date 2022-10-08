import { CascadeType, Column, Entity, FetchType, JoinTable, ManyToMany } from '@themost/jspa';
import { Account, AccountType } from './Account';

@Entity()
class Group extends Account {
    @Column({
        nullable: false,
        updatable: false,
        insertable: false
    })
    public accountType?: number = AccountType.Group;

    @ManyToMany({
        targetEntity: 'Account',
        fetchType: FetchType.Lazy,
        cascadeType: CascadeType.Detach
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
    public members?: Account[];
}

export {
    Group
}
