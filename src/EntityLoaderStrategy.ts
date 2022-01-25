import { ConfigurationBase } from '@themost/common';
import { SchemaLoaderStrategy } from '@themost/data';
import { EntityInheritanceAnnotation } from './Inheritance';
import { EntityColumnAnnotation } from './Column';
import { DataModelSchema, DataFieldSchema } from './DataModelSchema';
import { EntityTypeAnnotation } from './Entity';
import { EntityTableAnnotation } from './Table';
import { InheritanceType } from './InheritanceType';
import { IdColumnAnnotation } from './Id';
import { ManyToOneColumnAnnotation } from './ManyToOne';
import { FetchType } from './FetchType';
import { JoinTableColumnAnnotation, ManyToManyColumnAnnotation } from '.';

class EntityLoaderStrategy extends SchemaLoaderStrategy {
    constructor(config: ConfigurationBase) {
        super(config);
    }

    getModelFromEntityClass(entityClass: any): DataModelSchema {
        if (Object.prototype.hasOwnProperty.call(entityClass, 'Entity') === false) {
            return null;
        }
        // get entity type annotation
        const entityType = entityClass as EntityTypeAnnotation;
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
        if (Object.prototype.hasOwnProperty.call(entityClass, 'Table') === true) {
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
        }
        if (Object.prototype.hasOwnProperty.call(entityClass, 'Column') === true) {
            const entityColumns = entityClass as EntityColumnAnnotation;
            if (entityColumns.Column) {
                for (const column of entityColumns.Column.values()) {
                    const field: DataFieldSchema = {
                        name: column.name,
                        type: column.type,
                        nullable: column.nullable,
                        readonly: Object.prototype.hasOwnProperty.call(column, 'insertable') ? !column.insertable : false,
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
                    // set primary
                    const idColumn = column as IdColumnAnnotation;
                    if (idColumn.id) {
                        field.primary = true;
                    }
                    // set expandable
                    const manyToOneColumn = column as ManyToOneColumnAnnotation;
                    if (manyToOneColumn.manyToOne && manyToOneColumn.manyToOne.fetchType === FetchType.Eager) {
                        field.expandable = true;
                    }
                    const manyToManyColumn = column as ManyToManyColumnAnnotation;
                    if (manyToManyColumn.manyToMany) {
                        field.many = true;
                        if (manyToManyColumn.manyToMany.fetchType === FetchType.Eager) {
                            field.expandable = true;
                        }
                        const joinTableColumn = column as JoinTableColumnAnnotation;
                        if (joinTableColumn.joinTable) {
                            field.mapping = {
                                associationType: 'junction',
                                associationAdapter: joinTableColumn.joinTable.name
                            }
                            if (Array.isArray(joinTableColumn.joinTable.joinColumns)) {
                                const joinColumn = joinTableColumn.joinTable.joinColumns[0];
                                if (joinColumn) {
                                    field.mapping.associationObjectField = joinColumn.name;
                                }
                            }
                            if (Array.isArray(joinTableColumn.joinTable.inverseJoinColumns)) {
                                const inverseJoinColumn = joinTableColumn.joinTable.inverseJoinColumns[0];
                                if (inverseJoinColumn) {
                                    field.mapping.associationValueField = inverseJoinColumn.name;
                                }
                            }
                        }
                    }
                    result.fields.push(field);
                }
            }
        }
        return result;
    }

}

export {
    EntityLoaderStrategy
}