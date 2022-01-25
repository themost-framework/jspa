export class EntityNotFoundException extends Error {
    constructor(msg?: string) {
        super(msg || 'The specified entity cannot be found or is inaccessible');
    }
}