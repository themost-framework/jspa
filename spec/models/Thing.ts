import { Column, Entity, GeneratedValue, GenerationType, Id, Table, Counter, Basic, Formula, ManyToOne, FetchType, ColumnDefault } from '@themost/jspa';
import { UserBase } from './UserBase';

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
    @ColumnDefault(() => {
        return Promise.resolve(new Date());
    })
    public dateCreated?: Date;

    @Column({
        nullable: false
    })
    @Formula(() => {
        return Promise.resolve(new Date());
    })
    public dateModified?: Date;

    @Column({
        nullable: false,
        updatable: false,
        type: 'User'
    })
    @ManyToOne({
        fetchType: FetchType.Lazy
    })
    public createdBy?: UserBase;

    @Column({
        nullable: false,
        type: 'User'
    })
    @ManyToOne({
        fetchType: FetchType.Lazy
    })
    public modifiedBy?: UserBase;
}

export {
    Thing
}