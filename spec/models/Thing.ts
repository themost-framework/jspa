import { Column, Entity, GeneratedValue, GenerationType, Id, Table, Counter } from '../../src/index';

@Entity()
@Table()
class Thing {
    @Id()
    @Column()
    @GeneratedValue({
        strategy: GenerationType.Identity
    })
    public id?: Counter;

    @Column()
    public name?: string;

    @Column()
    public description?: string;

    @Column()
    public additionalType?: string;

    @Column({
        nullable: false,
        updatable: false
    })
    public dateCreated?: Date;

    @Column({
        nullable: false
    })
    public dateModified?: Date;
}

export {
    Thing
}