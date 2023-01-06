import { Entity } from '@themost/jspa';
import { Inheritance } from '@themost/jspa';
import { InheritanceType } from '@themost/jspa';
import { Thing } from './Thing';

@Entity()
@Inheritance({
    strategy: InheritanceType.TablePerClass
})
class ExternalAccount extends Thing {

}

export {
    ExternalAccount
}