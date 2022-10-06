import {
    DataConfigurationStrategy
} from '@themost/data';
import { Application1 } from './app/app';
import {Group, User} from './app/models';

describe('DataApplication', () => {

    let app: Application1;
    beforeAll(() => {
        app = new Application1();
    });
    afterAll(async () => {
        await app.finalize();
    });
    it('should get model', () => {
        const dataConfigurationStrategy = app.configuration.getStrategy(DataConfigurationStrategy);
        const model = dataConfigurationStrategy.getModelDefinition('Thing');
        expect(model).toBeTruthy();
    });

    it('should create context', async () => {
        const newContext = app.createContext();
        const Groups = newContext.model(Group);
        const items = await Groups.asQueryable().silent().getTypedItems();
        expect(items).toBeTruthy();
    });

    it('should seed data', async () => {
        const newContext = app.createContext();
        const Users = newContext.model(User);
        await Users.silent().save({
            name: 'admin',
            alternateName: 'admin',
            accountType: 0,
            groups: [
                {
                    name: 'Administrators'
                }
            ]
        } as User);
        const user: User = await Users.where('name').equal('admin').expand('groups').silent().getTypedItem();
        expect(user).toBeTruthy();
        expect(user.name).toEqual('admin');
        expect(user.groups).toBeInstanceOf(Array);
        expect(user.groups.length).toEqual(1);
        expect(user.groups[0].name).toEqual('Administrators');
    });

});