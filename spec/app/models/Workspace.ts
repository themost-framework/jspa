import { Entity } from '@themost/jspa';
import { Thing } from 'spec/models';

@Entity()
class Workspace extends Thing {
   constructor() {
       super();
   }
}

export {
    Workspace
}
