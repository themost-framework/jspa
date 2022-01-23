import { AttributeOverride, Column, Entity, Table } from '@themost/jspa';
import { Thing } from './Thing';

enum AccountType {
    User = 0,
    Group = 1
}

@Entity()
@AttributeOverride({ name: 'alternateName', column: { nullable: false } })
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
