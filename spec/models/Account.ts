import { Column, Entity, Table } from '@themost/jspa';
import { Thing } from './Thing';

enum AccountType {
    User = 0,
    Group = 1
}

@Entity()
class Account extends Thing {
    @Column({
        nullable: false
    })
    public accountType?: number;
}

export {
    AccountType,
    Account
}
