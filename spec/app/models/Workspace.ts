import { Entity } from '@themost/jspa';
import { Thing } from './Thing';

@Entity()
class Workspace extends Thing {
   constructor() {
       super();
   }
}

export {
    Workspace
}
