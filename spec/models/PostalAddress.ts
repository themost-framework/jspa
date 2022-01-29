import { Basic, Column, Embeddedable, Entity } from '@themost/jspa';
import { ContactPoint } from './ContactPoint';

@Entity()
@Embeddedable()
class PostalAddress extends ContactPoint {
    @Basic()
    public postOfficeBoxNumber?: string;

    @Basic()
    public streetAddress?: string;

    @Basic()
    public addressRegion?: string;

    @Basic()
    public postalCode?: string;

    @Basic()
    public addressLocality?: string;
}

export {
    PostalAddress
}