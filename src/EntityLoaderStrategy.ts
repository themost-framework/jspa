import { ConfigurationBase, DataModelProperties } from '@themost/common';
import { SchemaLoaderStrategy } from '@themost/data';
import { EntityInheritanceAnnotation } from './Inheritance';
import { EntityColumnAnnotation } from './Column';
import { EntityTypeAnnotation } from './Entity';
import { EntityTableAnnotation } from './Table';
import { InheritanceType } from './InheritanceType';
import { IdColumnAnnotation } from './Id';
import { ManyToOneColumnAnnotation } from './ManyToOne';
import { FetchType } from './FetchType';
import { EmbeddableEntityAnnotation, EmbeddedEntityAnnotation } from './Embedded';
import { ManyToManyColumnAnnotation } from './ManyToMany';
import { JoinTableAnnotation, JoinTableColumnAnnotation } from './JoinTable';
import { OneToManyColumnAnnotation } from './OneToMany';
import { CascadeType } from './CascadeType';
import { DataFieldBase, DataError } from '@themost/common';
import { OneToOneColumnAnnotation } from './OneToOne';

class OneToOneAssociationParser {
    constructor(public model: DataModelProperties, public target: DataFieldBase) {
        //
    }
    parse(column: any) {
        const oneToOneColumn = column as OneToOneColumnAnnotation;
        if (oneToOneColumn.oneToOne) {
            this.target.nullable = oneToOneColumn.oneToOne.optional != null ? oneToOneColumn.oneToOne.optional : true;
            this.target.many = true;
            this.target.multiplicity = 'ZeroOrOne';
            if (oneToOneColumn.oneToOne.fetchType === FetchType.Eager) {
                this.target.expandable = true;
            }
            const tableAnnotation = column as JoinTableAnnotation;
            if (tableAnnotation) {
                // set parentModel (parentField is the primary key)
                if (tableAnnotation.joinColumns.length != 1) {
                    throw new DataError('E_ANNOTATION', 'One-to-one association joinColumns must be a single-item array.', null, this.model.name, this.target.name);
                }
                if (tableAnnotation.inverseJoinColumns.length != 1) {
                    throw new DataError('E_ANNOTATION', 'One-to-one association inverseJoinColumns must be a single-item array.', null, this.model.name, this.target.name);
                }
                this.target.mapping = {
                    associationType: 'junction',
                    associationAdapter: tableAnnotation.name,
                    parentModel: this.model.name,
                    parentField: tableAnnotation.joinColumns[0].referencedColumnName,
                    associationObjectField: tableAnnotation.joinColumns[0].name,
                    childModel: tableAnnotation.name,
                    childField: tableAnnotation.inverseJoinColumns[0].referencedColumnName,
                    associationValueField: tableAnnotation.inverseJoinColumns[0].name
                }
            } else {
                this.target.mapping = {
                    associationType: 'association',
                    parentModel: this.model.name
                }
                if (oneToOneColumn.oneToOne.mappedBy == null) {
                    throw new DataError('E_ANNOTATION', 'One-to-one association must have a mapped column', null, this.model.name, this.target.name);
                }
                const targetEntity = oneToOneColumn.oneToOne.targetEntity;
                // set childModel, childfield
                if (targetEntity) {
                    if (typeof targetEntity === 'string') {
                        this.target.mapping.childModel = targetEntity;
                        this.target.mapping.childField = oneToOneColumn.oneToOne.mappedBy;
                    } else if (typeof targetEntity === 'function') {
                        const targetEntityType = targetEntity as EntityTypeAnnotation;
                        if (targetEntityType.Entity == null) {
                            throw new DataError('E_ANNOTATION', 'Target entity type cannot be empty', null, this.model.name, this.target.name);
                        }
                        this.target.mapping.childModel = targetEntityType.Entity.name;
                        this.target.mapping.childField = oneToOneColumn.oneToOne.mappedBy;
                    } else {
                        throw new DataError('E_ANNOTATION', 'Target entity has an invalid type. Expected string or class', null, this.model.name, this.target.name);
                    }
                } else if (this.target.type) {
                    this.target.mapping.childModel = this.target.type;
                    this.target.mapping.childField = oneToOneColumn.oneToOne.mappedBy;
                } else {
                    throw new DataError('E_ANNOTATION', 'One-to-one association target type cannot be found.', null, this.model.name, this.target.name);
                }
            }
            // set cascade type
            if (oneToOneColumn.oneToOne.cascadeType) {
                if ((oneToOneColumn.oneToOne.cascadeType & CascadeType.Remove) === CascadeType.Remove) {
                    this.target.mapping.cascade = 'delete';
                } else if ((oneToOneColumn.oneToOne.cascadeType & CascadeType.Persist) === CascadeType.Persist) {
                    this.target.nested = true;
                }
            }
            // set privileges
            if (Array.isArray(oneToOneColumn.oneToOne.privileges)) {
                this.target.mapping.privileges = oneToOneColumn.oneToOne.privileges;
            }
        }
    }
}

class OneToManyAnnotationParser {
    constructor(public model: DataModelProperties, public target: DataFieldBase) {
        //
    }
    parse(column: any) {
        const oneToManyColumn = column as OneToManyColumnAnnotation;
        if (oneToManyColumn.oneToMany) {
            this.target.many = true;
            this.target.nullable = true;
            if (oneToManyColumn.oneToMany.fetchType === FetchType.Eager) {
                this.target.expandable = true;
            }
            // set association type
            this.target.mapping = {
                associationType: 'association'
            }
            // set cascade
            if (oneToManyColumn.oneToMany.cascadeType != null) {
                // eslint-disable-next-line no-bitwise
                if ((oneToManyColumn.oneToMany.cascadeType & CascadeType.Remove) === CascadeType.Remove) {
                    this.target.mapping.cascade = 'delete';
                } else if ((oneToManyColumn.oneToMany.cascadeType & CascadeType.Persist) === CascadeType.Persist) {
                    this.target.nested = true;
                }
            }
            if (Array.isArray(oneToManyColumn.oneToMany.privileges)) {
                this.target.mapping.privileges = oneToManyColumn.oneToMany.privileges;
            }
        }
    }
}

class ManyToManyAnnotationParser {
    constructor(public model: DataModelProperties, public target: DataFieldBase) {
        //
    }
    parse(column: any) {
        const manyToManyColumn = column as ManyToManyColumnAnnotation;
        if (manyToManyColumn.manyToMany) {
            this.target.many = true;
            this.target.nullable = true;
            this.target.mapping = {
                associationType: 'junction'
            };
            if (manyToManyColumn.manyToMany.fetchType === FetchType.Eager) {
                this.target.expandable = true;
            }
            Object.assign(this.target.mapping, {
                parentModel: manyToManyColumn.manyToMany.targetEntity,
                childModel: this.model.name
            });
            if (manyToManyColumn.manyToMany.mappedBy != null) {
                // todo: add parentModel, parentField, childModel, childField
                Object.assign(this.target.mapping, {
                    mappedBy: manyToManyColumn.manyToMany.mappedBy
                });
            }
            const joinTableColumn = column as JoinTableColumnAnnotation;
            if (joinTableColumn.joinTable) {
                Object.assign(this.target.mapping, {
                    associationAdapter: joinTableColumn.joinTable.name
                });
                if (Array.isArray(joinTableColumn.joinTable.joinColumns)) {
                    const joinColumn = joinTableColumn.joinTable.joinColumns[0];
                    if (joinColumn) {
                        this.target.mapping.associationObjectField = joinColumn.name;
                    }
                }
                if (Array.isArray(joinTableColumn.joinTable.inverseJoinColumns)) {
                    const inverseJoinColumn = joinTableColumn.joinTable.inverseJoinColumns[0];
                    if (inverseJoinColumn) {
                        this.target.mapping.associationValueField = inverseJoinColumn.name;
                    }
                }
                if (Array.isArray(manyToManyColumn.manyToMany.privileges)) {
                    this.target.mapping.privileges = manyToManyColumn.manyToMany.privileges;
                }
            }
        }
    }
}

class EntityLoaderStrategy extends SchemaLoaderStrategy {

    public imports: any[] = [];
    protected models: Map<string, DataModelProperties> = new Map();

    constructor(config: ConfigurationBase) {
        super(config);
    }

    getModelDefinition(name: string): any {
        const model = this.models.get(name);
        if (model == null) {
            return null;
        }
        if (typeof model === 'function') {
            const modelDefinition = this.getModelFromEntityClass(model);
            this.models.set(name, modelDefinition);
            return modelDefinition;
        }
        return model;
    }

    setModelDefinition(data: DataModelProperties): SchemaLoaderStrategy {
        this.models = this.models || new Map();
        this.models.set(data.name, data);
        return this;
    }

    reload() {
        this.readSync();
    }

    readSync(): string[] {
        const models: Map<string, any> = new Map();
        for (const module of this.imports) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
        this.models = models;
        return Array.from(this.models.keys());
    }

    getModels(): string[] {
        if (this.models == null) {
            return this.readSync();
        }
        return Array.from(this.models.keys());
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
        if (entityType.Entity && entityType.Entity.privileges && entityType.Entity.privileges.length > 0) {
            result.privileges = entityType.Entity.privileges;
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
        const embeddableEntity = entityType.Entity as EmbeddableEntityAnnotation;
        if (embeddableEntity.embeddable) {
            result.hidden = true;
        }
        if (entityType.Entity.abstract) {
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
                        new ManyToManyAnnotationParser(result, field).parse(column);
                    }
                    // one-to-many
                    const oneToManyColumn = column as OneToManyColumnAnnotation;
                    if (oneToManyColumn.oneToMany) {
                        new OneToManyAnnotationParser(result, field).parse(column);
                    }
                    // one-to-one
                    const oneToOneColumn = column as OneToOneColumnAnnotation;
                    if (oneToOneColumn.oneToOne) {
                        new OneToOneAssociationParser(result, field).parse(column);
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