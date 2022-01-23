import { ConfigurationBase } from '@themost/common';
import { EntityColumnAnnotation, EntityLoaderStrategy, DataModelSchema, EntityTypeAnnotation } from '@themost/jspa';
import { Account } from './models/Account';
import { Thing } from './models/Thing';

describe('Column', () => {
    it('should use @Column', () => {
        const target: EntityColumnAnnotation = Account as EntityColumnAnnotation;
        expect(target.Column).toBeTruthy();
        const column = target.Column.get('accountType');
        expect(column).toBeTruthy();
        expect(column.name).toBe('accountType');
        expect(column.nullable).toBeFalse();
        const entityLoader = new EntityLoaderStrategy(new ConfigurationBase());
        const schema: DataModelSchema = entityLoader.getModelFromEntityClass(Account);
        expect(schema).toBeTruthy();
    });

});