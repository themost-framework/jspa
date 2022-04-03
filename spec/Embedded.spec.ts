import { ConfigurationBase, DataModelProperties } from '@themost/common';
import { EntityColumnAnnotation, EntityLoaderStrategy, JoinTableColumnAnnotation, EmbeddedEntityAnnotation, EmbeddedableEntityAnnotation } from '@themost/jspa';
import { PostalAddress } from './models';
import { Party } from './models/Party';

describe('Embedded', () => {
    it('should use @Embedded', () => {
        const target: EntityColumnAnnotation = Party as EntityColumnAnnotation;
        const column: EmbeddedEntityAnnotation = target.Column.get('address');
        expect(column).toBeTruthy();
        expect(column.embedded).toBeTruthy();
        const entityLoader = new EntityLoaderStrategy(new ConfigurationBase());
        const schema: DataModelProperties = entityLoader.getModelFromEntityClass(Party);
        expect(schema).toBeTruthy();
        const field = schema.fields.find((item) => item.name === 'address');
        expect(field).toBeTruthy();
        expect(field.type).toBe('PostalAddress');
        expect(field.nested).toBe(true);
    });

    it('should use @Embeddedable', () => {
        const target: EmbeddedableEntityAnnotation = PostalAddress as EmbeddedableEntityAnnotation;
        expect(target).toBeTruthy();
        expect(target.embeddedable).toBeTruthy();
        const entityLoader = new EntityLoaderStrategy(new ConfigurationBase());
        const schema: DataModelProperties = entityLoader.getModelFromEntityClass(PostalAddress);
        expect(schema).toBeTruthy();
        expect(schema.hidden).toBe(true);
    });

});