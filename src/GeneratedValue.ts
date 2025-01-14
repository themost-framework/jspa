import { EntityColumnAnnotation, ColumnAnnotation } from './Column';
import { SymbolTypeNotSupportedException } from './Errors';

enum GenerationType {
    Auto = 'AUTO',
    Identity = 'IDENTITY',
    Sequence = 'SEQUENCE',
    Table = 'TABLE'
}

declare interface GeneratedValueAnnotation {
    strategy?: string;
}

declare interface GeneratedValueColumnAnnotation extends ColumnAnnotation {
    generatedValue?: GeneratedValueAnnotation;
}

function GeneratedValue(annotation?: GeneratedValueAnnotation): PropertyDecorator {
    return (target, propertyKey) => {
        if (typeof propertyKey === 'symbol') {
            throw new SymbolTypeNotSupportedException();
        }
        if (Object.prototype.hasOwnProperty.call(target.constructor, 'Column') === false) {
            Object.assign(target.constructor, {
                Column: new Map()
            });
        }
        const columns: EntityColumnAnnotation = target.constructor as EntityColumnAnnotation;
        const value = Object.assign({
            strategy: GenerationType.Identity
        }, annotation);
        let column = columns.Column.get(propertyKey);
        if (column == null) {
            column = {
                name: propertyKey
            };
        }
        // set generated value property
        Object.assign(column, {
            generatedValue: value,
            nullable: false,
            updatable: false
        } as GeneratedValueColumnAnnotation);
        // finally, reset column annotation
        columns.Column.set(propertyKey, column);
      };
}

export {
    GenerationType,
    GeneratedValueAnnotation,
    GeneratedValueColumnAnnotation,
    GeneratedValue
}