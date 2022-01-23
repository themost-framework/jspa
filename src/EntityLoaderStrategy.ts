import { ConfigurationBase } from '@themost/common';
import { SchemaLoaderStrategy } from '@themost/data';
import { EntityInheritanceAnnotation } from './Inheritance';
import { EntityColumnAnnotation } from './Column';
import { DataModelSchema, DataFieldSchema } from './DataModelSchema';
import { EntityTypeAnnotation } from './Entity';
import { EntityTableAnnotation } from './Table';
import { InheritanceType } from './InheritanceType';
import { IdColumnAnnotation } from './Id';

class EntityLoaderStrategy extends SchemaLoaderStrategy {
    constructor(config: ConfigurationBase) {
        super(config);
    }

    getModelFromEntityClass(entityClass: any): DataModelSchema {
        // get entity type annotation
        const entityType = entityClass as EntityTypeAnnotation;
        if (entityType.Entity == null) {
            return null;
        }
        // prepare schema
        const result: DataModelSchema = {
            name: entityType.Entity.name,
            version: entityType.Entity.version || '1.0.0',
            abstract: false,
            hidden: false,
            caching: 'none',
            inherits: null,
            implements: null,
            fields: [],
            constraints: [],
            eventListeners: [],
            privileges: [
                {
                    mask: 15,
                    type: 'global'
                },
                {
                    mask: 15,
                    type: 'global',
                    account: 'Administrators'
                }
            ]
        }
        // set inherits
        if (entityClass.__proto__) {
            const inheritedModel = this.getModelFromEntityClass(entityClass.__proto__);
            if (inheritedModel != null) {
                // validate inherited entity table
                const entityInheritance = entityClass.__proto__ as EntityInheritanceAnnotation;
                if (entityInheritance.Inheritance && entityInheritance.Inheritance.strategy === InheritanceType.SingleTable) {
                    result.implements = inheritedModel.name;
                } else {
                    result.inherits = inheritedModel.name;
                }
            }
        }
        // get table annotation
        const entityTable = entityClass as EntityTableAnnotation;
        if (entityTable.Table != null) {
            // set source
            result.source = entityTable.Table.name;
            // todo: set view
            if (Array.isArray(entityTable.Table.uniqueConstraints)) {
                // set constraints
                result.constraints = entityTable.Table.uniqueConstraints.map((item) => {
                    return {
                        type: 'unique',
                        fields: item.columnName
                    }
                });
            }
        }
        const entityColumns = entityClass as EntityColumnAnnotation;
        if (entityColumns.Column) {
            for (const column of entityColumns.Column.values()) {
                const field: DataFieldSchema = {
                    name: column.name,
                    type: column.type,
                    nullable: column.nullable,
                    readonly: Object.prototype.hasOwnProperty.call(column, 'insertable') ? column.insertable : false,
                    editable: Object.prototype.hasOwnProperty.call(column, 'updatable') ? column.updatable : true
                }
                // set size
                if (column.length) {
                    field.size = column.length;
                }
                // set scale
                if (Object.prototype.hasOwnProperty.call(column, 'scale')) {
                    field.scale = column.scale;
                }
                const idColumn = column as IdColumnAnnotation;
                if (idColumn.id) {
                    field.primary = true;
                }
                result.fields.push(field);
            }
        }
        return result;
    }

}

export {
    EntityLoaderStrategy
}