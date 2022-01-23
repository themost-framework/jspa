import {  Column, Entity, Table } from '@themost/jspa';
import { Thing } from './Thing';

enum AccountType {
    User = 0,
    Group = 1
}

@Entity()
@Table()
class Account extends Thing {
    @Column({
        nullable: false
    })
    public accountType?: number;
    @Column({
        nullable: false
    })
    public alternateName?: string;
}

export {
    AccountType,
    Account
}
