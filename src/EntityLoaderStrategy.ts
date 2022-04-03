import { Args, ConfigurationBase, DataModelBase, DataModelProperties } from '@themost/common';
import { SchemaLoaderStrategy } from '@themost/data';
import { EntityInheritanceAnnotation } from './Inheritance';
import { EntityColumnAnnotation } from './Column';
import { EntityTypeAnnotation } from './Entity';
import { EntityTableAnnotation } from './Table';
import { InheritanceType } from './InheritanceType';
import { IdColumnAnnotation } from './Id';
import { ManyToOneColumnAnnotation } from './ManyToOne';
import { FetchType } from './FetchType';
import { EmbeddedableEntityAnnotation, EmbeddedEntityAnnotation } from './Embedded';
import { ManyToManyColumnAnnotation } from './ManyToMany';
import { JoinTableColumnAnnotation } from './JoinTable';
import { OneToManyColumnAnnotation } from './OneToMany';
import { CascadeType } from './CascadeType';
import { DataFieldBase } from '@themost/common';

class EntityLoaderStrategy extends SchemaLoaderStrategy {

    public imports: string[];
    private _models: Map<string, any> = new Map();

    constructor(config: ConfigurationBase) {
        super(config);
        const values = config.getSourceAt('settings/jspa/imports') || [];
        Args.check(Array.isArray(values), new Error('Invalid configuration. The persistent annotation imports, defined by `settings/jspa/imports`, must be an array of modules.'));
        this.imports = values;
    }

    getModelDefinition(name: string): any {
        const model = this._models.get(name);
        if (model == null) {
            return null;
        }
        if (typeof model === 'function') {
            const modelDefinition = this.getModelFromEntityClass(model);
            this._models.set(name, modelDefinition);
            return modelDefinition;
        }
        return model;
    }

    setModelDefinition(data: any): SchemaLoaderStrategy {
        this._models = this._models || new Map();
        this._models.set(data.name, data);
        return this;
    }

    reload() {
        this.readSync();
    }

    readSync(): string[] {
        const models: Map<string, any> = new Map();
        for (const modulePath of this.imports) {
            const module = require(modulePath);
            Object.keys(module).forEach((member: string) => {
                if (Object.prototype.hasOwnProperty.call(module, member)) {
                    const exportedMember = module[member];
                    if (typeof exportedMember === 'function') {
                        const entityAnnotation: EntityTypeAnnotation = exportedMember as EntityTypeAnnotation;
                        if (entityAnnotation.Entity && entityAnnotation.Entity.name) {
                          models.set(entityAnnotation.Entity.name, exportedMember);
                        }
                    }
                }
            });
        }
        this._models = models;
        return Array.from(this._models.keys());
    }

    getModels(): string[] {
        if (this._models == null) {
            return this.readSync();
        }
        return Array.from(this._models.keys());
    }

    getModelFromEntityClass(entityClass: any): DataModelProperties {
        if (Object.prototype.hasOwnProperty.call(entityClass, 'Entity') === false) {
            return null;
        }
        // get entity type annotation
        const entityType = entityClass as EntityTypeAnnotation;
        // prepare schema
        const result: DataModelProperties = {
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
        const embeddedableEntity = entityClass as EmbeddedableEntityAnnotation;
        if (embeddedableEntity.embeddedable) {
            result.hidden = true;
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
                            fields: item.columnNames
                        }
                    });
                }
            }
        }
        if (Object.prototype.hasOwnProperty.call(entityClass, 'Column') === true) {
            const entityColumns = entityClass as EntityColumnAnnotation;
            if (entityColumns.Column) {
                for (const column of entityColumns.Column.values()) {
                    const field: DataFieldBase = {
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
                    // set nested
                    const embeddedColumn = column as EmbeddedEntityAnnotation;
                    if (embeddedColumn.embedded) {
                        field.nested = true;
                    }
                    // set expandable
                    const manyToOneColumn = column as ManyToOneColumnAnnotation;
                    if (manyToOneColumn.manyToOne && manyToOneColumn.manyToOne.fetchType === FetchType.Eager) {
                        field.expandable = true;
                    }
                    const manyToManyColumn = column as ManyToManyColumnAnnotation;
                    if (manyToManyColumn.manyToMany) {
                        field.many = true;
                        field.nullable = true;
                        if (manyToManyColumn.manyToMany.fetchType === FetchType.Eager) {
                            field.expandable = true;
                        }
                        const joinTableColumn = column as JoinTableColumnAnnotation;
                        if (joinTableColumn.joinTable) {
                            field.mapping = {
                                associationType: 'junction',
                                associationAdapter: joinTableColumn.joinTable.name
                            }
                            if (manyToManyColumn.manyToMany.mappedBy === null) {
                                // todo: add parentModel, parentField, childModel, childField
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
                    const oneToManyColumn = column as OneToManyColumnAnnotation;
                    if (oneToManyColumn.oneToMany) {
                        field.many = true;
                        field.nullable = true;
                        if (oneToManyColumn.oneToMany.fetchType === FetchType.Eager) {
                            field.expandable = true;
                        }
                        // set association type
                        field.mapping = {
                            associationType: 'association'
                        }
                        // set cascade
                        if (oneToManyColumn.oneToMany.cascadeType != null) {
                            // tslint:disable-next-line: no-bitwise
                            if ((oneToManyColumn.oneToMany.cascadeType & CascadeType.Remove) === CascadeType.Remove) {
                                field.mapping.cascade = 'delete';
                            }
                        }
                    }
                    result.fields.push(field);
                }
            }
        }
        result.eventListeners = [
            {
                type: '@themost/data/previous-state-listener'
            },
            {
                type: '@themost/jspa/listener'
            }
        ]
        // set class
        Object.assign(result, {
            DataObjectClass: entityClass
        });
        return result;
    }
}

export {
    EntityLoaderStrategy
}