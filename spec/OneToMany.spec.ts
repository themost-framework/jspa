import { ConfigurationBase } from '@themost/common';
import { EntityColumnAnnotation, EntityLoaderStrategy, OneToManyColumnAnnotation } from '@themost/jspa';
import { Place } from './models/Place';

describe('OneToMany', () => {
    it('should use @OneToMany', () => {
        const target: EntityColumnAnnotation = Place as EntityColumnAnnotation;
        const column: OneToManyColumnAnnotation = target.Column.get('containsPlace');
        expect(column).toBeTruthy();
        expect(column.oneToMany).toBeTruthy();
        const entityLoader = new EntityLoaderStrategy(new ConfigurationBase());
        const schema = entityLoader.getModelFromEntityClass(Place);
        const field = schema.fields.find((item) => item.name === 'containsPlace');
        expect(field.many).toBeTrue();
        expect(field.type).toBe('Place');
    });

});