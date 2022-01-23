import { ConfigurationBase } from '@themost/common';
import { Counter, EntityAnnotation, IdProperty, EntityTableAnnotation,
    EntityColumnAnnotation, EntityInheritanceAnnotation, InheritanceType, EntityLoaderStrategy, DataModelSchema } from '@themost/jspa';
import { ActionStatusType } from './models/ActionStatusType';
import { Enumeration } from './models/Enumeration';
import { Person } from './models/Person';

describe('Persistence', () => {
    it('should use @Entity', () => {
        const person = new Person();
        const annotation: EntityAnnotation = Person as EntityAnnotation;
        expect(annotation.name).toBe('Person');
    });
    it('should use @Table', () => {
        const person = new Person();
        const annotation: EntityTableAnnotation = Person as EntityTableAnnotation;
        expect(annotation.Table).toBeTruthy();
        expect(annotation.Table.name).toBe('PersonBase');
    });

    it('should use @Id', () => {
        const annotation: IdProperty = Person as IdProperty;
        expect(annotation.Id).toBeTruthy();
        expect(annotation.Id.name).toBe('id');
    });

    it('should use @Column', () => {
        const target: EntityColumnAnnotation = Person as EntityColumnAnnotation;
        expect(target.Column).toBeTruthy();
        const column = target.Column.get('id');
        expect(column).toBeTruthy();
        expect(column.name).toBe('id');
        expect(column.nullable).toBeFalse();
        expect(column.insertable).toBeFalse();
    });

    it('should use @Column types', () => {
        const target: EntityColumnAnnotation = Person as EntityColumnAnnotation;
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
        const schema: DataModelSchema = entityLoader.getModelFromEntityClass(ActionStatusType);
        expect(schema.inherits).toBe(null);
        expect(schema.implements).toBe('Enumeration');
    });

});