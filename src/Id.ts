import { ColumnAnnotation, EntityColumnAnnotation } from './Column';

declare interface IdAnnotation {
    name: string;
}

declare interface IdColumnAnnotation extends ColumnAnnotation {
    id?: boolean;
}

function Id() {
    return (target: any, propertyKey: string) => {
        const columns: EntityColumnAnnotation = target.constructor as EntityColumnAnnotation;
        if (columns.Column == null) {
            columns.Column = new Map();
        }
        let column = columns.Column.get(propertyKey);
        if (column == null) {
            column = {
                name: propertyKey
            };
        }
        // set generated value property
        Object.assign(column, {
            id: true
        } as IdColumnAnnotation);
        // finally, reset column annotation
        columns.Column.set(propertyKey, column);
      };
}

export {
    IdAnnotation,
    IdColumnAnnotation,
    Id
}