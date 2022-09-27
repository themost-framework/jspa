import {  Column, ColumnDefault, Entity, Formula, Table } from '@themost/jspa';
import { Thing } from './Thing';

enum AccountType {
    User = 0,
    Group = 1
}

@Entity()
@Table({
    uniqueConstraints: [
        {
            columnNames: ['name']
        }
    ]
})
class Account extends Thing {
    @Column({
        nullable: false,
        type: 'Integer'
    })
    @Formula(() => {
        return Promise.resolve(AccountType.Group);
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
