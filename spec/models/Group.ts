import { Column, Entity, FetchType, ManyToMany } from '@themost/jspa';
import { Account, AccountType } from './Account';
import { UserBase } from './UserBase';

@Entity()
class Group extends Account {
    @Column({
        nullable: false,
        updatable: false,
        insertable: false
    })
    public accountType?: number = AccountType.Group;

    @ManyToMany({
        targetEntity: 'User',
        fetchType: FetchType.Lazy
    })
    public members?: UserBase[];
}

export {
    Group
}
