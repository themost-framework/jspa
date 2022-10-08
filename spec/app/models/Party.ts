import {Basic, Column, Embedded, Entity, FetchType, ManyToOne} from '@themost/jspa';
import { PostalAddress } from './PostalAddress';
import { Thing } from './Thing';
@Entity()
class Party extends Thing {

    @Basic()
    public taxID?: string;

    @ManyToOne({
        fetchType: FetchType.Lazy,
        optional: true,
        targetEntity: 'Party'
    })
    public sponsor?: Party;

    @Embedded()
    @Column({
        type: 'PostalAddress'
    })
    public address?: PostalAddress;

    @Basic()
    public email?: string;

    @Basic()
    public telephone?: string;

    @Basic()
    public faxNumber?: string;
}

export {
    Party
}