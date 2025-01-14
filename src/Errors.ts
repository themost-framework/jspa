export class EntityNotFoundException extends Error {
    constructor(msg?: string) {
        super(msg || 'The specified entity cannot be found or is inaccessible');
    }
}

export class SymbolTypeNotSupportedException extends Error {
    constructor(msg?: string) {
        super(msg || 'The current decorator does not support Symbol type property key');
    }
}