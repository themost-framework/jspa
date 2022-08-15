import { Column, Entity, GeneratedValue, GenerationType, Id, Table, Counter, Basic, Formula, ManyToOne, FetchType, ColumnDefault } from '@themost/jspa';
import { UserBase, ThingBase } from './interfaces';

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
    @ColumnDefault(() => {
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
        type: 'User'
    })
    @ManyToOne({
        fetchType: FetchType.Lazy
    })
    @Formula((event) => {
        const context = event.context as any;
        let user: { name?: string } =context.interactiveUser;
        if (user && user.name) {
            return {
                name: user.name
            };
        }
        user = context.user;
        if (user && user.name) {
            return {
                name: user.name
            };
        }
        return {
            name: 'anonymous'
        };
    })
    public createdBy?: UserBase;

    @Column({
        nullable: false,
        type: 'User'
    })
    @ManyToOne({
        fetchType: FetchType.Lazy
    })
    @Formula((event) => {
        const context = event.context as any;
        let user: { name?: string } =context.interactiveUser;
        if (user && user.name) {
            return {
                name: user.name
            };
        }
        user = context.user;
        if (user && user.name) {
            return {
                name: user.name
            };
        }
        return {
            name: 'anonymous'
        };
    })
    public modifiedBy?: UserBase;
}

export {
    Thing
}