import { Counter } from '@themost/jspa';

export declare interface UserBase {
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
    createdBy?: UserBase;
    modifiedBy?: UserBase;
}