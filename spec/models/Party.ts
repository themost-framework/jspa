import {Column, Entity, GeneratedValue,GenerationType, Id, ManyToOne, Table} from '@themost/jspa';
import { Thing } from './Thing';
@Entity()
@Table()
class Party extends Thing {
    @Column()
    @ManyToOne()
    public sponsor?: Party;
}

export {
    Party
}