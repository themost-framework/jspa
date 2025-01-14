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
    uniqueConstraints?: { columnNames:string[] }[];
}

declare interface EntityTableAnnotation {
    Table?: TableAnnotation;
}

function Table(annotation?: TableAnnotation): ClassDecorator {
    return (target) => {
        const table: EntityTableAnnotation = target as EntityTableAnnotation;
        table.Table = Object.assign({
            name: `${target.name}Base`
        }, annotation);
    };
}

export {
    EntityTableAnnotation,
    TableAnnotation,
    Table
}