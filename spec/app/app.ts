import { DataAdapterConfiguration, DataApplication, DataConfigurationStrategy, DataCacheStrategy, DefaultDataCacheStrategy, DefaultSchemaLoaderStrategy, SchemaLoaderStrategy } from '@themost/data';
import path from 'path';

class Application1 extends DataApplication {
    constructor() {
        super(__dirname);
        this.configuration.setSourceAt('settings/jspa/imports', [
            path.resolve(__dirname, './models/index')
        ]);
        this.configuration.setSourceAt('settings/schema/loaders', [
            {
                loaderType: '@themost/jspa/platform-server#DefaultEntityLoaderStrategy'
            }
        ]);
        this.configuration.setSourceAt('adapterTypes', [
            {
                name: 'Test Adapter',
                invariantName: 'memory',
                type: path.resolve(__dirname, '../adapter/TestAdapter')
            }
        ]);
        this.configuration.setSourceAt('adapters', [
            {
                name: 'test',
                default: true,
                invariantName: 'memory'
            } as DataAdapterConfiguration
        ]);
        // reload schema
        this.configuration.useStrategy(SchemaLoaderStrategy, DefaultSchemaLoaderStrategy);
        // reload configuration
        this.configuration.useStrategy(DataConfigurationStrategy, DataConfigurationStrategy);
    }

    async finalize() {
        const cache: DefaultDataCacheStrategy = this.configuration.getStrategy(DataCacheStrategy) as DefaultDataCacheStrategy;
        await cache.finalize();
    }

}

export {
    Application1
}
