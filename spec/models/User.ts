import { Column, Entity } from '@themost/jspa';
import { Account, AccountType } from './Account';

@Entity()
class User extends Account {
    @Column({
        nullable: false,
        updatable: false,
        insertable: false
    })
    public accountType?: number = AccountType.User;
}

export {
    User
}
