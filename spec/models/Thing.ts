import { Column, Entity, GeneratedValue, GenerationType, Id, Table, Counter, Basic, Formula } from '@themost/jspa';
import { ThingBase } from './ThingBase';

@Entity()
@Table()
class Thing implements ThingBase {
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
        updatable: false,
        type: 'Thing'
    })
    public createdBy?: ThingBase;

    @Column({
        nullable: false,
        type: 'Thing'
    })
    public modifiedBy?: ThingBase;
}

export {
    Thing
}