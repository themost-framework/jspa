import {Column, Entity, ManyToOne} from '@themost/jspa';
import { Thing } from './Thing';
@Entity()
class Party extends Thing {
}

export {
    Party
}