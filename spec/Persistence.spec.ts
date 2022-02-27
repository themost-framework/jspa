import { ConfigurationBase, DataModelProperties } from '@themost/common';
import { EntityAnnotation, IdColumnAnnotation, EntityTableAnnotation,
    EntityColumnAnnotation, EntityInheritanceAnnotation, InheritanceType, EntityLoaderStrategy } from '@themost/jspa';
import { Account } from './models/Account';
import { ActionStatusType } from './models/ActionStatusType';
import { Enumeration } from './models/Enumeration';
import { Person } from './models/Person';
import { Thing } from './models/Thing';

describe('Persistence', () => {
    it('should use @Entity', () => {
        const person = new Person();
        const annotation: EntityAnnotation = Person as EntityAnnotation;
        expect(annotation.name).toBe('Person');
    });
    it('should use @Id', () => {
        const annotation: EntityColumnAnnotation = Thing as EntityColumnAnnotation;
        expect(annotation.Column).toBeTruthy();
        const column = annotation.Column.get('id') as IdColumnAnnotation;
        expect(column).toBeTruthy();
        expect(column.id).toBeTrue();
        const entityLoader = new EntityLoaderStrategy(new ConfigurationBase());
        const schema: DataModelProperties = entityLoader.getModelFromEntityClass(Thing);
        const field = schema.fields.find((item) => {
            return item.primary;
        });
        expect(field).toBeTruthy();
        expect(field.name).toBe('id');
    });

    it('should use types', () => {
        const target: EntityColumnAnnotation = Thing as EntityColumnAnnotation;
        expect(target.Column).toBeTruthy();
        const column = target.Column.get('id');
        expect(column).toBeTruthy();
        expect(column.name).toBe('id');
        expect(column.type).toBe('Counter');
    });

    it('should use @Inheritance', () => {
        const target: EntityInheritanceAnnotation = Enumeration as EntityInheritanceAnnotation;
        expect(target.Inheritance).toBeTruthy();
        expect(target.Inheritance.strategy).toBe(InheritanceType.SingleTable);
        const entityLoader = new EntityLoaderStrategy(new ConfigurationBase());
        const schema: DataModelProperties = entityLoader.getModelFromEntityClass(ActionStatusType);
        expect(schema.inherits).toBe(null);
        expect(schema.implements).toBe('Enumeration');
    });

});