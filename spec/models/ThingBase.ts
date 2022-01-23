import { Counter } from '@themost/jspa';

export declare interface ThingBase {
    id?: Counter;
    name?: string;
    alternateName?: string;
    description?: string;
    additionalType?: string;
    sameAs?: string;
    url?: string;
    identifier?: string;
    image?: string;
    dateCreated?: Date;
    dateModified?: Date;
    createdBy?: ThingBase;
    modifiedBy?: ThingBase;
}