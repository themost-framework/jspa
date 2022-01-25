import { ConfigurationBase } from '@themost/common';
import { EntityColumnAnnotation, EntityLoaderStrategy, DataModelSchema, ManyToManyColumnAnnotation } from '@themost/jspa';
import { User } from './models/User';

describe('ManyToManyAssocation', () => {
    it('should use @ManyToMany', () => {
        const target: EntityColumnAnnotation = User as EntityColumnAnnotation;
        const column: ManyToManyColumnAnnotation = target.Column.get('groups');
        expect(column).toBeTruthy();
        expect(column.manyToMany).toBeTruthy();
        const entityLoader = new EntityLoaderStrategy(new ConfigurationBase());
        const schema: DataModelSchema = entityLoader.getModelFromEntityClass(User);
        expect(schema).toBeTruthy();
        const field = schema.fields.find((item) => item.name === 'groups');
        expect(field).toBeTruthy();
        expect(field.type).toBe('Group');
        expect(field.many).toBe(true);
    });

});