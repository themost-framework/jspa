import { ConfigurationBase } from '@themost/common';
import { EntityColumnAnnotation, EntityLoaderStrategy, DataModelSchema, ManyToManyColumnAnnotation, JoinTableColumnAnnotation } from '@themost/jspa';
import { User } from './models/User';
import { Group } from './models/Group';

describe('ManyToManyAssocation', () => {
    it('should use @ManyToMany', () => {
        const target: EntityColumnAnnotation = User as EntityColumnAnnotation;
        const column: ManyToManyColumnAnnotation = target.Column.get('groups');
        expect(column).toBeTruthy();
        expect(column.manyToMany).toBeTruthy();
        const entityLoader = new EntityLoaderStrategy(new ConfigurationBase());
        let schema: DataModelSchema = entityLoader.getModelFromEntityClass(User);
        expect(schema).toBeTruthy();
        let field = schema.fields.find((item) => item.name === 'groups');
        expect(field).toBeTruthy();
        expect(field.type).toBe('Group');
        expect(field.many).toBe(true);
        schema = entityLoader.getModelFromEntityClass(Group);
        expect(schema).toBeTruthy();
        field = schema.fields.find((item) => item.name === 'members');
        expect(field).toBeTruthy();
        expect(field.type).toBe('Account');
        expect(field.many).toBe(true);
    });

    it('should use @JoinTable', () => {
        const target: EntityColumnAnnotation = Group as EntityColumnAnnotation;
        const column: JoinTableColumnAnnotation = target.Column.get('members');
        expect(column).toBeTruthy();
        expect(column.joinTable).toBeTruthy();
        expect(column.joinTable.name).toBe('GroupMembers');
        const entityLoader = new EntityLoaderStrategy(new ConfigurationBase());
        const schema: DataModelSchema = entityLoader.getModelFromEntityClass(Group);
        expect(schema).toBeTruthy();
        const field = schema.fields.find((item) => item.name === 'members');
        expect(field).toBeTruthy();
        expect(field.type).toBe('Account');
        expect(field.many).toBe(true);
    });

});