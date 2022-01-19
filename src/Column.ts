declare interface ColumnAnnotation {
    name?: string;
    nullable?: boolean;
    unique?: boolean;
    length?: number;
    precision?: number;
    scale?: number;
    insertable?: boolean;
    updatable?: boolean;
}

declare interface ColumnProperty {
    Column?: Map<string, ColumnAnnotation>;
}

function Column(annotation?: ColumnAnnotation) {
    return (target: any, propertyKey: string) => {
        const columns: ColumnProperty = target.constructor as ColumnProperty;
        if (columns.Column == null) {
            columns.Column = new Map();
        }
        const column = columns.Column.get(propertyKey);
        columns.Column.set(propertyKey, Object.assign({
            name: propertyKey,
            nullable: true,
            insertable: true,
            updatable: true
        }, column, annotation));
      };
}

export {
    ColumnAnnotation,
    ColumnProperty,
    Column
}