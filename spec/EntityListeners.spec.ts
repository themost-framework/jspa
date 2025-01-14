import { CallbackMethodCollectionAnnotation, EntityListenerCollectionAnnotation } from '@themost/jspa';
import { User } from './models';

describe('EntityListeners', () => {
    it('should use @EntityListeners', () => {
        const target: EntityListenerCollectionAnnotation = User as EntityListenerCollectionAnnotation;
        expect(target).toBeTruthy();
        expect(target.EntityListeners.length).toBeGreaterThan(0);
        const target2 = User as CallbackMethodCollectionAnnotation;
        expect(target2).toBeTruthy();
        expect(target2.CallbackMethods.length).toBeGreaterThan(0);
    });

});