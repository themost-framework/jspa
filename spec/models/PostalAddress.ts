import { Basic, Embeddable, Entity } from '@themost/jspa';
import { ContactPoint } from './ContactPoint';

@Entity()
@Embeddable()
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