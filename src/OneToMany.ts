import { CascadeType } from './CascadeType';
import { ColumnAnnotation, EntityColumnAnnotation } from './Column';
import { FetchType } from './FetchType';

declare interface OneToManyAnnotation {
    cascadeType?: CascadeType;
    fetchType?: FetchType;
    optional?: boolean;
    targetEntity?: any;
    mappedBy?: string;
}

declare interface OneToManyColumnAnnotation extends ColumnAnnotation {
    oneToMany?: OneToManyAnnotation;
}

function OneToMany(annotation: OneToManyAnnotation) {
    return (target: any, propertyKey: string) => {
        if (Object.prototype.hasOwnProperty.call(target.constructor, 'Column') === false) {
            Object.assign(target.constructor, {
                Column: new Map()
            });
        }
        const columns: EntityColumnAnnotation = target.constructor as EntityColumnAnnotation;
        // get value
        const value = Object.assign({
            fetchType: FetchType.Lazy,
            optional: true
        } as OneToManyAnnotation, annotation);
        // get column
        let column = columns.Column.get(propertyKey);
        if (column == null) {
            column = {
                name: propertyKey
            };
        }
        // set value property
        Object.assign(column, {
            oneToMany: value
        } as OneToManyColumnAnnotation);
        // finally, set column annotation
        columns.Column.set(propertyKey, column);
      };
}

export {
    OneToManyAnnotation,
    OneToManyColumnAnnotation,
    OneToMany
}