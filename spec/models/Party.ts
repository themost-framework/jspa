import {Column, Entity, GeneratedValue,GenerationType, Id, Table} from '../../src/index';
import { Thing } from './Thing';
@Entity()
@Table()
class Party extends Thing {
}

export {
    Party
}