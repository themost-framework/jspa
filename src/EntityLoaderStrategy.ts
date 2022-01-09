import { ConfigurationBase } from '@themost/common';
import { SchemaLoaderStrategy } from '@themost/data';

class EntityLoaderStrategy extends SchemaLoaderStrategy {
    constructor(config: ConfigurationBase) {
        super(config);
    }
}

export {
    EntityLoaderStrategy
}