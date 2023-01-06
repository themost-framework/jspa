import { ConfigurationBase } from '@themost/common';
import { EntityColumnAnnotation, EntityLoaderStrategy, OneToManyColumnAnnotation } from '@themost/jspa';
import { DefaultEntityLoaderStrategy } from '@themost/jspa/platform-server';
import { User } from './app/models/User';

describe('OneToOne', () => {
    it('should use @OneToOne', () => {
        const entityLoader = new DefaultEntityLoaderStrategy(new ConfigurationBase());
        const model =entityLoader.getModelFromEntityClass(User);
        const field = model.fields.find((x) => x.name === 'externalAccount');
        expect(field).toBeTruthy();
        expect(field.mapping).toBeTruthy();
        expect(field.mapping.associationType).toEqual('junction');
        expect(field.mapping.parentModel).toEqual('User');
        expect(field.mapping.childModel).toEqual('ExternalAccount');
    });

});