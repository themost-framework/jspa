import { ConfigurationBase } from '@themost/common';
import { SchemaLoaderStrategy } from '@themost/data';
import { EntityTableAnnotation, EntityTypeAnnotation } from 'src';
import { DataModelSchema } from './DataModelSchema';

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
            version: entityType.Entity.version || '1.0.0'
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
        return result;
    }

}

export {
    EntityLoaderStrategy
}