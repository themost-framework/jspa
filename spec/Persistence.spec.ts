import { ColumnProperty, EntityAnnotation, IdProperty, TableProperty } from '../src/index';
import { Person } from './Person';

describe('Persistence', () => {
    it('should use @Entity', () => {
        const person = new Person();
        const annotation: EntityAnnotation = Person as EntityAnnotation;
        expect(annotation.name).toBe('Person');
    });
    it('should use @Table', () => {
        const person = new Person();
        const annotation: TableProperty = Person as TableProperty;
        expect(annotation.Table).toBeTruthy();
        expect(annotation.Table.name).toBe('PersonBase');
    });

    it('should use @Id', () => {
        const annotation: IdProperty = Person as IdProperty;
        expect(annotation.Id).toBeTruthy();
        expect(annotation.Id.name).toBe('id');
    });

    it('should use @Column', () => {
        const target: ColumnProperty = Person as ColumnProperty;
        expect(target.Column).toBeTruthy();
        const column = target.Column.get('id');
        expect(column).toBeTruthy();
        expect(column.name).toBe('id');
        expect(column.nullable).toBeFalse();
        expect(column.insertable).toBeFalse();
    });
});