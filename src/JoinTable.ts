import { ColumnAnnotation } from './Column';
import { JoinColumnAnnotation } from './JoinColumn';

declare interface JoinTableAnnotation {
    catalog?: string;
    foreignKey?: string;
    indexes?: { columnList:string[] }[];
    inverseForeignKey?: string;
    inverseJoinColumns?: JoinColumnAnnotation[];
    joinColumns?: JoinColumnAnnotation[];
    name?: string;
    schema?: string;
    uniqueConstraints?: { columnName:string[] }[];
}

declare interface JoinTableColumnAnnotation extends ColumnAnnotation {
    joinTable?: JoinTableAnnotation;
}

function JoinTable(annotation?: JoinTableAnnotation) {
    return (target: any, propertyKey: string) => {
        const joinTable: JoinTableColumnAnnotation = target.constructor as JoinTableColumnAnnotation;
        const value = Object.assign({
            name: `${target.name}Base`
        }, annotation);
    };
}

export {
    JoinTableAnnotation,
    JoinTableColumnAnnotation,
    JoinTable
}