import {Column, Entity, GeneratedValue,GenerationType, Id, Table} from '../../src/index';
import { Party } from './Party';
@Entity()
@Table()
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