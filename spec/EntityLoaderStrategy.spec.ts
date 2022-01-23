import { ConfigurationBase } from '@themost/common';
import { DataModelSchema, EntityLoaderStrategy } from '@themost/jspa';
import { Thing } from './models/Thing';
import { User } from './models/User';

describe('EntityLoaderStrategy', () => {
    it('should define inheritance', () => {
        const entityLoader = new EntityLoaderStrategy(new ConfigurationBase());
        const schema: DataModelSchema = entityLoader.getModelFromEntityClass(User);
        expect(schema.name).toBe('User');
        expect(schema.version).toBe('1.0.0');
        expect(schema.inherits).toBe('Account');
    });
});