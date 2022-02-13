import { Args, ConfigurationBase, DataModelBase, DataModelProperties, SequentialEventEmitter } from '@themost/common';
import { DataEventArgs, SchemaLoaderStrategy } from '@themost/data';
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
import { CallbackMethodCollectionAnnotation, EntityListenerCollectionAnnotation } from './EntityListener';
import { PreLoad } from './PreLoad';
import { PrePersist } from './PrePersist';
import { PostPersist } from './PostPersist';
import { PreUpdate } from './PreUpdate';
import { PostUpdate } from './PostUpdate';
import { PreRemove } from './PreRemove';
import { PostRemove } from './PostRemove';
import { DataFieldBase } from '@themost/common';

class EntityLoaderStrategy extends SchemaLoaderStrategy {

    public imports: string[];
    private _models: Map<string, any>;

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

    setModelDefinition(): SchemaLoaderStrategy {
        throw new Error('The operation is not supported by EntitySchemaLoader.');
    }

    reload() {
        this.readSync();
    }

    readSync(): string[] {
        if (this._models != null) {
            return Array.from(this._models.keys());
        }
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

    protected inspectCallbacks(entityClass: any): SequentialEventEmitter {
        const eventEmitter = new SequentialEventEmitter();
        const entityListenerCollection = entityClass as EntityListenerCollectionAnnotation;
        if (Array.isArray(entityListenerCollection.EntityListeners)) {
            entityListenerCollection.EntityListeners.forEach((entityListener) => {
                const entityCallbackCollection1 = entityListener as CallbackMethodCollectionAnnotation;
                if (Array.isArray(entityCallbackCollection1.CallbackMethods)) {
                    entityCallbackCollection1.CallbackMethods.forEach((callbackMethod) => {
                        if (callbackMethod.type === PrePersist) {
                            eventEmitter.on('before.save', (event: DataEventArgs, callback: (err?: Error) => void): void => {
                                if (event.state !== 1) {
                                    return callback();
                                }
                                return callbackMethod.callback(event.target).then(() => {
                                    return callback();
                                }).catch((err: Error | any) => {
                                    return callback(err);
                                });
                            });
                        } else if (callbackMethod.type === PostPersist) {
                            eventEmitter.on('after.save', (event: DataEventArgs, callback: (err?: Error) => void): void => {
                                if (event.state !== 1) {
                                    return callback();
                                }
                                return callbackMethod.callback(event.target).then(() => {
                                    return callback();
                                }).catch((err: Error | any) => {
                                    return callback(err);
                                });
                            });
                        } else if (callbackMethod.type === PreUpdate) {
                            eventEmitter.on('before.save', (event: DataEventArgs, callback: (err?: Error) => void): void => {
                                if (event.state !== 2) {
                                    return callback();
                                }
                                return callbackMethod.callback(event.target).then(() => {
                                    return callback();
                                }).catch((err: Error | any) => {
                                    return callback(err);
                                });
                            });
                        } else if (callbackMethod.type === PostUpdate) {
                            eventEmitter.on('after.save', (event: DataEventArgs, callback: (err?: Error) => void): void => {
                                if (event.state !== 2) {
                                    return callback();
                                }
                                return callbackMethod.callback(event.target).then(() => {
                                    return callback();
                                }).catch((err: Error | any) => {
                                    return callback(err);
                                });
                            });
                        } else if (callbackMethod.type === PreRemove) {
                            eventEmitter.on('before.remove', (event: DataEventArgs, callback: (err?: Error) => void): void => {
                                return callbackMethod.callback(event.target).then(() => {
                                    return callback();
                                }).catch((err: Error | any) => {
                                    return callback(err);
                                });
                            });
                        } else if (callbackMethod.type === PostRemove) {
                            eventEmitter.on('after.remove', (event: DataEventArgs, callback: (err?: Error) => void): void => {
                                return callbackMethod.callback(event.target).then(() => {
                                    return callback();
                                }).catch((err: Error | any) => {
                                    return callback(err);
                                });
                            });
                        }
                    });
                }
            });
        }
        const entityCallbackCollection = entityClass as CallbackMethodCollectionAnnotation;
        if (Array.isArray(entityCallbackCollection.CallbackMethods)) {
            entityCallbackCollection.CallbackMethods.forEach((callbackMethod) => {
                if (callbackMethod.type === PrePersist) {
                    eventEmitter.on('before.save', (event: DataEventArgs, callback: (err?: Error) => void): void => {
                        if (event.state !== 1) {
                            return callback();
                        }
                        return callbackMethod.callback.bind(event.target)().then(() => {
                            return callback();
                        }).catch((err: Error | any) => {
                            return callback(err);
                        });
                    });
                } else if (callbackMethod.type === PostPersist) {
                    eventEmitter.on('after.save', (event: DataEventArgs, callback: (err?: Error) => void): void => {
                        if (event.state !== 1) {
                            return callback();
                        }
                        return callbackMethod.callback.bind(event.target)().then(() => {
                            return callback();
                        }).catch((err: Error | any) => {
                            return callback(err);
                        });
                    });
                } else if (callbackMethod.type === PreUpdate) {
                    eventEmitter.on('before.save', (event: DataEventArgs, callback: (err?: Error) => void): void => {
                        if (event.state !== 2) {
                            return callback();
                        }
                        return callbackMethod.callback.bind(event.target)().then(() => {
                            return callback();
                        }).catch((err: Error | any) => {
                            return callback(err);
                        });
                    });
                } else if (callbackMethod.type === PostUpdate) {
                    eventEmitter.on('after.save', (event: DataEventArgs, callback: (err?: Error) => void): void => {
                        if (event.state !== 2) {
                            return callback();
                        }
                        return callbackMethod.callback.bind(event.target)().then(() => {
                            return callback();
                        }).catch((err: Error | any) => {
                            return callback(err);
                        });
                    });
                } else if (callbackMethod.type === PreRemove) {
                    eventEmitter.on('before.remove', (event: DataEventArgs, callback: (err?: Error) => void): void => {
                        return callbackMethod.callback.bind(event.target)().then(() => {
                            return callback();
                        }).catch((err: Error | any) => {
                            return callback(err);
                        });
                    });
                } else if (callbackMethod.type === PostRemove) {
                    eventEmitter.on('after.remove', (event: DataEventArgs, callback: (err?: Error) => void): void => {
                        return callbackMethod.callback.bind(event.target)().then(() => {
                            return callback();
                        }).catch((err: Error | any) => {
                            return callback(err);
                        });
                    });
                }
            });
        }
        return eventEmitter;
    }

}

export {
    EntityLoaderStrategy
}