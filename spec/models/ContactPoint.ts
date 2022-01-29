import { Basic, Entity } from '@themost/jspa';
import { StructuredValue } from './StructuredValue';

@Entity()
class ContactPoint extends StructuredValue {

    @Basic()
    public faxNumber?: string;

    @Basic()
    public telephone?: string;

    @Basic()
    public email?: string;

    @Basic()
    public contactType?: string;
}

export {
    ContactPoint
}