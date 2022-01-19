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

function Table(annotation?: TableAnnotation) {
    return (target: any) => {
        const table: TableProperty = target as TableProperty;
        table.Table = Object.assign({
            name: `${target.name}Base`
        }, annotation);
    };
}

export {
    TableProperty,
    TableAnnotation,
    Table
}