import { EntityAnnotation } from '../src/Persistence';
import { Person } from './Person';

describe('Persistence', () => {
    it('should use @Entity', () => {
        const person = new Person();
        const annotation: EntityAnnotation = Person as EntityAnnotation;
        expect(annotation.Entity).toBeTrue();
    });
});