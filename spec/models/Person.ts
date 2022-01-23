import {Column, Entity, Table} from '@themost/jspa';
import { Party } from './Party';
@Entity()
class Person extends Party {
    @Column({
        nullable: false
    })
    public givenName?: string;
    @Column({
        nullable: false
    })
    public familyName?: string;
}

export {
    Person
}