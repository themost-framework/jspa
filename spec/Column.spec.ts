import { ConfigurationBase } from '@themost/common';
import { EntityColumnAnnotation, EntityLoaderStrategy, DataModelSchema } from '@themost/jspa';
import { Account } from './models/Account';

describe('Persistence', () => {
    it('should use @Column', () => {
        const target: EntityColumnAnnotation = Account as EntityColumnAnnotation;
        expect(target.Column).toBeTruthy();
        const column = target.Column.get('accountType');
        expect(column).toBeTruthy();
        expect(column.name).toBe('accountType');
        expect(column.nullable).toBeFalse();
        const entityLoader = new EntityLoaderStrategy(new ConfigurationBase());
        const schema: DataModelSchema = entityLoader.getModelFromEntityClass(Account);
        expect(schema.fields.length).toBe(1);
    });

});