import {  Column, Entity, Table } from '@themost/jspa';
import { Thing } from './Thing';

enum AccountType {
    User = 0,
    Group = 1
}

@Entity()
@Table({
    indexes: [
        {
            columnList: [ 'name' ]
        }
    ],
    uniqueConstraints: [
        {
            columnNames: [ 'name' ]
        }
    ]
})
class Account extends Thing {
    @Column({
        nullable: false,
        type: 'Integer'
    })
    public accountType?: AccountType;
    @Column({
        nullable: false
    })
    public name?: string;
    @Column({
        nullable: false
    })
    public alternateName?: string;
}

export {
    AccountType,
    Account
}
