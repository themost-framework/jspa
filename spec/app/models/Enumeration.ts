import { Column, Entity, Inheritance, InheritanceType } from '@themost/jspa';
import { Intangible } from './Intangible';

@Entity()
@Inheritance({
    strategy: InheritanceType.TablePerClass
})
export class Enumeration extends Intangible {
    @Column({
        nullable: false
    })
    public alternateName?: string;
}