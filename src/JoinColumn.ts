declare interface JoinColumnAnnotation {
    foreignKey?: string;
    insertable?: boolean;
    name?: string;
    nullable?: boolean;
    referencedColumnName: string;
    table?: string;
    unique?: boolean;
    updatable?: boolean;
    type?: string;
}

export {
    JoinColumnAnnotation
}