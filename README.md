[![npm](https://img.shields.io/npm/v/@themost%2Fjspa.svg)](https://www.npmjs.com/package/@themost%2Fjspa)
![GitHub top language](https://img.shields.io/github/languages/top/themost-framework/jspa)
[![License](https://img.shields.io/npm/l/@themost/jspa)](https://github.com/themost-framework/jspa/blob/master/LICENSE)
![GitHub last commit](https://img.shields.io/github/last-commit/themost-framework/jspa)
![GitHub Release Date](https://img.shields.io/github/release-date/themost-framework/jspa)
[![npm](https://img.shields.io/npm/dw/@themost/jspa)](https://www.npmjs.com/package/@themost%2Fjspa)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@themost/jspa)

![MOST Web Framework Logo](https://github.com/themost-framework/common/raw/master/docs/img/themost_framework_v3_128.png)

# @themost/jspa
[@themost web framework](https://github.com/themost-framework) JavaScript Persistent API on top of [@themost/data](https://github.com/themost-framework/data) ORM.

`@themost/jspa` is a mimic of Java Persistent API for Node.js environment and provides a set of tools for describing object relational mapping.

The following example describes a `Thing` class:

    import { DataObject } from '@themost/data';
    import { Column, Entity, GeneratedValue, GenerationType, Id, Table, Counter, Basic, Formula, ManyToOne, FetchType, ColumnDefault } from '@themost/jspa';

    @Entity()
    @Table()
    class Thing extends DataObject {

        constructor() {
            super();
        }

        @Id()
        @Column()
        @GeneratedValue({
            strategy: GenerationType.Identity
        })
        public id?: Counter;

        @Basic()
        public name?: string;

        @Column()
        public alternateName?: string;

        @Column()
        public description?: string;

        @Column()
        public additionalType?: string;

        @Column()
        public sameAs?: string;

        @Column()
        public url?: string;

        @Column()
        public identifier?: string;

        @Column()
        public image?: string;

        @Column({
            nullable: false,
            updatable: false
        })
        @ColumnDefault(() => new Date())
        public dateCreated?: Date;

        @Column({
            nullable: false
        })
        @Formula(() => new Date())
        public dateModified?: Date;

        @Column({
            nullable: true,
            updatable: false,
            type: 'User'
        })
        @ManyToOne({
            fetchType: FetchType.Lazy
        })
        public createdBy?: any;

        @Column({
            nullable: true,
            type: 'User'
        })
        @ManyToOne({
            fetchType: FetchType.Lazy
        })
        public modifiedBy?: any;
    }

    export {
        Thing
    }

## Usage

    npm i @themost/jspa

## Annotations

### @Entity

The basic annotation of a class. Use optional `@Entity.name` attribute to define the name of this entity if it's different than class name and `@Entity.version` attribute to allow `@themost/data` auto-upgrade operations to update database objects after any change.

    @Entity({
        version: '1.0.0'
    })
    class Party extends Thing {
        ...
    }

`@Entity()` annotation includes `@Entity.privileges` attribute to allow setting the collection of default privileges assigned to a class

    @Entity({
        version: '1.0.0',
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
    })
    class Party extends Thing {
        ...
    }

The previous example defines that `Party` will be accessible by each user which has permissions defined in data permission storage. It also defines that `Administrators` have full-access by default.

### @Table

The optional @Table annotation allows you to specify the properties of the database objects that will be used to persist the entity in the database. 

    @Entity({
        version: '1.0.0'
    })
    @Table(
        name: 'PartyBase'
    )
    class Party extends Thing {
        ...
    }

- @Table.name

    The name of the table that will be used to persist objects. The default value provided by `@themost/data` is a concatenation of entity's name and word "Base" e.g. `PartyBase`, `PostalAddressBase` etc.

- @Table.indexes

    A collection of indexes that should be included while creating or updating database objects.

        @Table(
            indexes: [
                {
                    columnList: [
                        'name'
                    ]
                },
                {
                    columnList: [
                        'email'
                    ]
                }
            ]
        )
        class Party extends Thing {
            ...
        }

- @Table.uniqueConstraints

    A collection of unique constraints that should be included while creating or updating database objects based on database engine features.

        @Table(
            uniqueConstraints: [
                {
                    columnNames: [
                        'email'
                    ]
                }
            ]
        )
        class Party extends Thing {
            ...
        }

### @Column

`@Column` annotation is used to specify the mapped column for a property

    @Entity()
    @Table()
    class Thing extends DataObject {
        ...
        @Column()
        public name?: string;
    }

- @Column.name 

    (Optional) A string which defines the column name. If `@Column.name` is missing property name is being used.

        class Thing extends DataObject {
            ...
            @Column({
                name: 'obj_name'
            })
            public name?: string;
        }

- @Column.nullable 

    (Optional) A boolean which indicates whether the mapped column is nullable of false. The default value is true.

- @Column.type

    A string which defines the type of the column. Column may be one of the primitive column types of `@themost/data` or an object type

        class Thing extends DataObject {
            ...
            @Column({
                type: ColumnType.Text
            })
            public name;

            @Column({
                type: 'User'
            })
            public createdBy;
        }

- @Column.length

    (Optional) The column length

        class Thing extends DataObject {
            ...
            @Column({
                type: ColumnType.Text,
                length: 100
            })
            public name;
        }

- @Column.scale

    (Optional) The scale for a numeric column

- @Column.precision

    (Optional) The precision for a numeric column

- @Column.insertable

    (Optional) A boolean which indicates whether the column will be included while inserting objects or not

- @Column.updatable

    (Optional) A boolean which indicates whether the column will be included while updating objects or not

### @Id()

`@Id` is used to specify identity columns

    @Entity()
    @Table()
    class Thing extends DataObject {
        
        @Id()
        @Column({
            type: ColumnType.Counter
        })
        @GeneratedValue({
            strategy: GenerationType.Identity
        })
        public id;
        ...
    }

### @GeneratedValue()

`@GeneratedValue` annotation is used to specify generation strategy for identity columns

    @Entity()
    @Table()
    class Thing extends DataObject {
        
        @Id()
        @Column({
            type: ColumnType.Counter
        })
        @GeneratedValue({
            strategy: GenerationType.Identity
        })
        public id;
        ...
    }

The available generation strategies are:

- `GenerationType.Auto`: Based on the database’s support for primary key generation framework decides which generator type to be used.

- `GenerationType.Identity`: In this case database is responsible for determining and assigning the next primary key.

- `GenerationType.Sequence`: A sequence specify a database object that can be used as a source of primary key values.

- `GenerationType.Table`: It keeps a separate table with the primary key values

### @Formula

`@Formula` annotation is used to specify calculated values.

    class Thing extends DataObject {

        ...
        @Formula((event) => {
            const context = event.context as any;
            let user: { name?: string } =context.interactiveUser;
            if (user && user.name) {
                return {
                    name: user.name
                };
            }
            user = context.user;
            if (user && user.name) {
                return {
                    name: user.name
                };
            }
            return null;
        })
        public createdBy?: any;

    }

`@Formula` closure has `event` parameter of type `FormulaArgs`

- `FormulaArgs.context` The current data context

- `Formula.model` An instance of `DataModel` class which represents the current entity type

- `Formula.target` The current object

### @ColumnDefault

`@ColumnDefault` annotation defines the default value of the mapped column

    @Entity()
    @Table()
    class Thing extends DataObject {
        ...
        @ColumnDefault(() => new Date())
        public dateCreated?: Date;
    }

`@ColumnDefault` can be a simple closure which returns a single value or a closure which has `event` parameter of type `ColumnDefaultArgs`

- `ColumnDefaultArgs.context` The current data context

- `ColumnDefaultArgs.model` An instance of `DataModel` class which represents the current entity type

- `ColumnDefaultArgs.target` The current object

### @Embedded

`@Embedded` annotation is used to embed type into another type. An embedded type will be inserted, updated or deleted as result of an operation made on parent object.

    @Entity()
    class Place extends Thing {
        ...
        @Embedded()
        public address?: PostalAddress;
    }

e.g. `Place` entity type embeds `PostalAddress` into `address` property.

### @ManyToOne

`@ManyToOne` annotation defined a foreign-key association between two entity types

    @Entity()
    class Party extends Thing {

        ...
        @Column({
            nullable: false,
            updatable: false,
            type: 'User'
        })
        @ManyToOne({
            fetchType: FetchType.Lazy
        })
        public createdBy?: User;
    }


e.g. `Party.createdBy` defines a foreign-key association between `Party` and `User`

- `@ManyToOne.optional` A boolean which whether the association is optional or not.
- `@ManyToOne.fetchType` Defines that data can be lazily or eagerly fetched

### @OneToMany

`@OneToMany` annotation is used to implement one-to-many relationship between two entity types.

    @Entity()
    class Place extends Thing {

        ...
        @OneToMany({
            cascadeType: CascadeType.Detach,
            fetchType: FetchType.Lazy,
            mappedBy: 'containedIn',
            targetEntity: 'Place'
        })
        public containsPlace?: Place;

    }

e.g. `Place` has a collection of places based on property `containedIn`

`@OneToMany` annotation has the following properties

- `@ManyToOne.fetchType` Defines that data can be lazily or eagerly fetched
- `@ManyToOne.cascadeType` Defines the cascade operation that will be used while removing an object.
- `@ManyToOne.mappedBy` The target column that holds the association between the current entity type and the target entity type.
- `@ManyToOne.targetEntity` The type of the target entity

### @ManyToMany

`@OneToMany` annotation is used to implement many-to-many relationship between two entity types.

    class Group extends Account {
        ...
        @ManyToMany({
            targetEntity: 'Account',
            fetchType: FetchType.Lazy,
            cascadeType: CascadeType.Detach
        })
        @JoinTable({
            name: 'GroupMembers',
            joinColumns: [
                {
                    name: 'object',
                    referencedColumnName: 'id'
                }
            ],
            inverseJoinColumns: [
                {
                    name: 'value',
                    referencedColumnName: 'id'
                }
            ]
        })
        public members?: Account[];
        ...
    }
e.g. Every `Group` has a collection of `members` of type `Account`

`@OneToMany` annotation has the following properties

- `@ManyToOne.fetchType` Defines that data can be lazily or eagerly fetched
- `@ManyToOne.cascadeType` Defines the cascade operation that will be used while removing an object.
- `@ManyToOne.targetEntity` The type of the target entity

The `@JoinTable` annotation is being used to define the database object where this relationship will be stored. `@JoinTable.joinColumns` contains the local property and `@JoinTable.inverseJoinColumns` contains the foreign property.

e.g. `Group.members` many-to-many association will be stored in `GroupMembers` table where `GroupMembers.object` column will be a `Group.id` and `GroupMembers.value` column will be an `Account.id`.
