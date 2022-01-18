import { EntityAnnotation, TableAnnotation, TableProperty } from '../src/Persistence';
import { Person } from './Person';

describe('Persistence', () => {
    it('should use @Entity', () => {
        const person = new Person();
        const annotation: EntityAnnotation = Person as EntityAnnotation;
        expect(annotation.Entity).toBeTrue();
    });
    it('should use @Table', () => {
        const person = new Person();
        const annotation: TableProperty = Person as TableProperty;
        expect(annotation.Table).toBeTruthy();
        expect(annotation.Table.name).toBe('PersonBase');
    });
});