import { DataContext } from '@themost/data';
import { Column, Entity, GeneratedValue, GenerationType, Id, Table, Counter, Basic, Formula } from '../../src/index';

@Entity()
@Table()
class Thing {
    @Id()
    @Column()
    @GeneratedValue({
        strategy: GenerationType.Identity
    })
    public id?: Counter;

    @Basic()
    public name?: string;

    @Column()
    public alternateName?: string;

    @Column()
    public description?: string;

    @Column()
    public additionalType?: string;

    @Column()
    public sameAs?: string;

    @Column()
    public url?: string;

    @Column()
    public identifier?: string;

    @Column()
    public image?: string;

    @Column({
        nullable: false,
        updatable: false
    })
    @Formula(() => {
        return new Date();
    })
    public dateCreated?: Date;

    @Column({
        nullable: false
    })
    @Formula(() => {
        return new Date();
    })
    public dateModified?: Date;

    @Column({
        nullable: false,
        updatable: false
    })
    public createdBy?: Thing;

    @Column({
        nullable: false
    })
    public modifiedBy?: Thing;
}

export {
    Thing
}