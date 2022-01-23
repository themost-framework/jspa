import { EntityTableAnnotation } from '@themost/jspa';
import { Account } from './models/Account';

describe('TableAnnotation', () => {
    it('should use @Table', () => {
        const annotation: EntityTableAnnotation = Account as EntityTableAnnotation;
        expect(annotation.Table).toBeTruthy();
        expect(annotation.Table.name).toBe('AccountBase');
    });
});