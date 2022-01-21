import {Column, Entity, GeneratedValue,GenerationType, Id, Table} from '../../src/index';
@Entity()
@Table()
class Person {
    @Column({
        nullable: false
    })
    @Id()
    @GeneratedValue({
        strategy: GenerationType.Identity
    })
    public id?: number;
}

export {
    Person
}