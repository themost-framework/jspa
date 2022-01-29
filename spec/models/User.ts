import { CascadeType, Column, Entity, FetchType, ManyToMany } from '@themost/jspa';
import { Account, AccountType } from './Account';
import { Group } from './Group';

@Entity()
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
}

export {
    User
}
