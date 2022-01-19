import { ColumnProperty } from './Column';

enum GenerationType {
    Auto = 'AUTO',
    Identity = 'IDENTITY',
    Sequence = 'SEQUENCE',
    Table = 'TABLE'
}

declare interface GeneratedValueAnnotation {
    strategy?: string;
}

declare interface GeneratedValueProperty {
    generatedValue?: GeneratedValueAnnotation;
}

function GeneratedValue(annotation?: GeneratedValueAnnotation) {
    return (target: any, propertyKey: string) => {
        const columns: ColumnProperty = target.constructor as ColumnProperty;
        if (columns.Column == null) {
            columns.Column = new Map();
        }
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
        } as GeneratedValueProperty);
        if (value.strategy === GenerationType.Identity) {
            column.insertable = false;
        }
        // finally, reset column annotation
        columns.Column.set(propertyKey, column);
      };
}

export {
    GenerationType,
    GeneratedValueAnnotation,
    GeneratedValueProperty,
    GeneratedValue
}