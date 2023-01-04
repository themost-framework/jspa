import { ConfigurationBase, DataModelProperties } from '@themost/common';
import { EntityColumnAnnotation, EntityLoaderStrategy, EmbeddedEntityAnnotation, EmbeddableEntityTypeAnnotation } from '@themost/jspa';
import { PostalAddress } from './models';
import { Party } from './models';

describe('Embedded', () => {
    it('should use @Embedded', () => {
        const target: EntityColumnAnnotation = Party as EntityColumnAnnotation;
        const column: EmbeddedEntityAnnotation = target.Column.get('address');
        expect(column).toBeTruthy();
        expect(column.embedded).toBeTruthy();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const newLocal = new ConfigurationBase();
        const entityLoader = new EntityLoaderStrategy(newLocal);
        const schema: DataModelProperties = entityLoader.getModelFromEntityClass(Party);
        expect(schema).toBeTruthy();
        const field = schema.fields.find((item) => item.name === 'address');
        expect(field).toBeTruthy();
        expect(field.type).toBe('PostalAddress');
        expect(field.nested).toBe(true);
    });

    it('should use @Embeddable', () => {
        const target = PostalAddress as EmbeddableEntityTypeAnnotation;
        expect(target).toBeTruthy();
        expect(target.Entity.embeddable).toBeTruthy();
        const entityLoader = new EntityLoaderStrategy(new ConfigurationBase());
        const schema: DataModelProperties = entityLoader.getModelFromEntityClass(PostalAddress);
        expect(schema).toBeTruthy();
        expect(schema.hidden).toBe(true);
    });

});