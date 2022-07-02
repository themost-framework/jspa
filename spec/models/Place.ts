import { Basic, CascadeType, Column, Embedded, Entity, FetchType, ManyToOne, OneToMany } from '@themost/jspa';
import { PostalAddress } from '.';
import { Thing } from './Thing';

@Entity()
class Place extends Thing {

    @Column()
    public globalLocationNumber?: string;

    @Column()
    public maximumAttendeeCapacity?: number;

    @Basic()
    public map?: string;

    @Basic()
    public branchCode?: string;

    @Embedded()
    public address?: PostalAddress;

    @Basic()
    public logo?: string;

    @Basic()
    public telephone?: string;

    @Basic()
    public faxNumber?: string;

    @Basic()
    public publicAccess?: boolean;

    @OneToMany({
        cascadeType: CascadeType.Detach,
        fetchType: FetchType.Lazy,
        mappedBy: 'containedIn'
    })
    public containsPlace?: Place;

    @Basic()
    public isAccessibleForFree?: boolean;

    @ManyToOne({
        fetchType: FetchType.Lazy,
        targetEntity: 'Place'
    })
    public containedIn?: Place;
}

export {
    Place
}