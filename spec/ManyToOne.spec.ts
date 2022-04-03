import { ConfigurationBase, DataModelProperties } from '@themost/common';
import { EntityColumnAnnotation, EntityLoaderStrategy, ManyToOneColumnAnnotation } from '@themost/jspa';
import { Thing } from './models/Thing';

describe('ManyToOneAssocation', () => {
    it('should use @ManyToOne', () => {
        const target: EntityColumnAnnotation = Thing as EntityColumnAnnotation;
        const column: ManyToOneColumnAnnotation = target.Column.get('createdBy');
        expect(column).toBeTruthy();
        expect(column.manyToOne).toBeTruthy();
        const entityLoader = new EntityLoaderStrategy(new ConfigurationBase());
        const schema: DataModelProperties = entityLoader.getModelFromEntityClass(Thing);
        expect(schema).toBeTruthy();
        const field = schema.fields.find((item) => item.name === 'createdBy');
        expect(field).toBeTruthy();
        expect(field.type).toBe('User');
    });

});