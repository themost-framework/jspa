import { ConfigurationBase, DataModelProperties } from '@themost/common';
import { DefaultEntityLoaderStrategy } from '@themost/jspa/platform-server';
import { User } from './models';
import path from 'path';

describe('EntityLoaderStrategy', () => {
    it('should get entity class', () => {
        const entityLoader = new DefaultEntityLoaderStrategy(new ConfigurationBase());
        const schema: DataModelProperties = entityLoader.getModelFromEntityClass(User);
        expect(schema.name).toBe('User');
        expect(schema.version).toBe('1.0.0');
        expect(schema.inherits).toBe('Account');
    });

    it('should read models', () => {
        const configuration = new ConfigurationBase();
        configuration.setSourceAt('settings/jspa/imports', [
            path.resolve('./spec/models/index')
        ]);
        const entityLoader = new DefaultEntityLoaderStrategy(configuration);
        const items = entityLoader.readSync();
        expect(items).toBeInstanceOf(Array);
        expect(items).toContain('User');
        const model: DataModelProperties = entityLoader.getModelDefinition('User');
        expect(model.name).toBe('User');
        expect(model.version).toBe('1.0.0');
        expect(model.inherits).toBe('Account');
    });

});