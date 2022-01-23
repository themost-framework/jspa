import { Column, Entity } from '@themost/jspa';
import { Account, AccountType } from './Account';

@Entity()
class Group extends Account {
    @Column({
        nullable: false,
        updatable: false,
        insertable: false
    })
    public accountType?: number = AccountType.Group;

    @Column({
        nullable: false
    })
    public alternateName?: string;
}

export {
    Group
}
