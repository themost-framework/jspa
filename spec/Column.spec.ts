import { ConfigurationBase, DataModelProperties } from '@themost/common';
import { EntityColumnAnnotation, EntityLoaderStrategy} from '@themost/jspa';
import { Account } from './models';

describe('Column', () => {
    it('should use @Column', () => {
        const target: EntityColumnAnnotation = Account as EntityColumnAnnotation;
        expect(target.Column).toBeTruthy();
        const column = target.Column.get('accountType');
        expect(column).toBeTruthy();
        expect(column.name).toBe('accountType');
        expect(column.nullable).toBeFalsy();
        const entityLoader = new EntityLoaderStrategy(new ConfigurationBase());
        const schema: DataModelProperties = entityLoader.getModelFromEntityClass(Account);
        expect(schema).toBeTruthy();
    });

});