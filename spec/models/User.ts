import { Column, Entity, FetchType, ManyToMany } from '@themost/jspa';
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
        targetEntity: Group,
        fetchType: FetchType.Eager,
        mappedBy: 'members'
    })
    public groups?: Group[];
}

export {
    User
}
