declare interface EntityAnnotation {
    Entity?: boolean;
}
function Entity() {
    return (target: any) => {
        Object.assign(target, {
            Entity: true
        });
      };
}

declare interface TableAnnotation {
    /**
     * The name of the table.
     */
    name?: string;
    /**
     * The schema of the table.
     */
    schema?: string;
    /**
     * The catalog of the table.
     */
    catalog?: string;
    /**
     * Indexes for the table.
     */
    indexes?: { columnList:string[] }[];
    /**
     * Unique constraints that are to be placed on the table.
     */
    uniqueConstraints?: { columnName:string[] }[];
}

declare interface TableProperty {
    Table?: TableAnnotation;
}

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
    Column?: ColumnAnnotation[];
}

function Table(annotation?: TableAnnotation) {
    return (target: any) => {
        const table: TableProperty = target as TableProperty;
        table.Table = Object.assign({
            name: `${target.name}Base`
        }, annotation);
      };
}

function Column(annotation?: ColumnAnnotation) {
    return (target: any, propertyKey: string) => {
        const columns: ColumnProperty = target as ColumnProperty;
        if (columns.Column == null) {
            columns.Column = [];
        }
        columns.Column.push(Object.assign({
            name: propertyKey
        }, annotation));
      };
}

export {
    EntityAnnotation,
    TableProperty,
    TableAnnotation,
    ColumnAnnotation,
    ColumnProperty,
    Entity,
    Table,
    Column
}