import {
    DataApplication,
    DataConfigurationStrategy,
    SchemaLoaderStrategy,
    DefaultSchemaLoaderStrategy,
    DataAdapterConfiguration
} from '@themost/data';
import path from 'path';
import {Group} from './app/models';

fdescribe('DataApplication', () => {

    let app: DataApplication;
    beforeAll(() => {
        app = new DataApplication(path.resolve(__dirname, 'app'));
        app.configuration.setSourceAt('settings/jspa/imports', [
            path.resolve('./spec/app/models/index')
        ]);
        app.configuration.setSourceAt('settings/schema/loaders', [
            {
                loaderType: '@themost/jspa/platform-server#DefaultEntityLoaderStrategy'
            }
        ]);
        app.configuration.setSourceAt('adapterTypes', [
            {
                name: 'Test Adapter',
                invariantName: 'memory',
                type: path.resolve(__dirname, 'adapter/TestAdapter')
            }
        ]);
        app.configuration.setSourceAt('adapters', [
            {
                name: 'test',
                default: true,
                invariantName: 'memory'
            } as DataAdapterConfiguration
        ]);
        // reload schema
        app.configuration.useStrategy(SchemaLoaderStrategy, DefaultSchemaLoaderStrategy);
        // reload configuration
        app.configuration.useStrategy(DataConfigurationStrategy, DataConfigurationStrategy);

    });
    it('should get model', () => {
        const dataConfigurationStrategy = app.configuration.getStrategy(DataConfigurationStrategy);
        const model = dataConfigurationStrategy.getModelDefinition('Thing');
        expect(model).toBeTruthy();
    });

    fit('should create context', async () => {
        const newContext = app.createContext();
        const Groups = newContext.model(Group);
        const items = await Groups.asQueryable().silent().getItems();
        expect(items).toBeTruthy();
    });

});