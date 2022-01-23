import { ColumnAnnotation, EntityColumnAnnotation } from './Column';

declare interface IdAnnotation {
    name: string;
}

declare interface IdColumnAnnotation extends ColumnAnnotation {
    id?: boolean;
}

function Id() {
    return (target: any, propertyKey: string) => {
        if (Object.prototype.hasOwnProperty.call(target.constructor, 'Column') === false) {
            Object.assign(target.constructor, {
                Column: new Map()
            });
        }
        const columns: EntityColumnAnnotation = target.constructor as EntityColumnAnnotation;
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