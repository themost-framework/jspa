import { Basic, Column, ColumnType, Counter, Entity, FetchType, Formula, GeneratedValue, GenerationType, Id, ManyToOne } from '@themost/jspa';
import { Account } from './Account';
import { User } from './User';
import { Workspace } from './Workspace';

@Entity()
class Permission {
    @Id()
    @Column()
    @GeneratedValue({
        strategy: GenerationType.Identity
    })
    public id?: Counter;

    @Column({
        nullable: false
    })
    public privilege?: string;

    @Basic()
    public parentPrivilege?: string;

    @Column({
        nullable: false,
    })
    public account: Account;

    @Column({
        nullable: false
    })
    public target: string;

    @Column({
        nullable: false,
        type: ColumnType.Integer
    })
    public mask: number;

    @Column({
        nullable: false,
    })
    public workspace: Workspace;

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
        type: 'User'
    })
    @ManyToOne({
        fetchType: FetchType.Lazy
    })
    public createdBy?: User;

    @Column({
        nullable: false,
        type: 'User'
    })
    @ManyToOne({
        fetchType: FetchType.Lazy
    })
    public modifiedBy?: User;
}

export {
    Permission
}
