import {Column, Entity, Table} from '../src/Persistence';
@Entity()
@Table()
class Person {
    @Column()
    public id?: number;
}

export {
    Person
}