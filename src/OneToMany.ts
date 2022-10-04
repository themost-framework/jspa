import { CascadeType } from './CascadeType';
import { Column, ColumnAnnotation, EntityColumnAnnotation } from './Column';
import { FetchType } from './FetchType';
import { Permission, PermissionAnnotation } from './Permission';

declare interface OneToManyAnnotation extends PermissionAnnotation {
    cascadeType?: CascadeType;
    fetchType?: FetchType;
    optional?: boolean;
    targetEntity?: any;
    mappedBy: string;
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
        // get columns
        const columns: EntityColumnAnnotation = target.constructor as EntityColumnAnnotation;
        // prepare annotation
        const oneToMany = Object.assign({
            fetchType: FetchType.Lazy,
            optional: true
        } as OneToManyAnnotation, annotation);
        // get column
        let column = columns.Column.get(propertyKey);
        if (column == null) {
            Column()(target, propertyKey);
            column = columns.Column.get(propertyKey);
        }
        Permission(annotation.privileges);
        // set value property
        Object.assign(column, {
            oneToMany
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