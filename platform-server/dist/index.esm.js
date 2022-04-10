import { Args } from '@themost/common';
import { EntityLoaderStrategy } from '@themost/jspa';

class DefaultEntityLoaderStrategy extends EntityLoaderStrategy {
    constructor(config) {
        super(config);
        const values = config.getSourceAt('settings/jspa/imports') || [];
        Args.check(Array.isArray(values), new Error('Invalid configuration. The persistent annotation imports, defined by `settings/jspa/imports`, must be an array of modules.'));
        this.imports = values.map((item) => require(item));
    }
}

export { DefaultEntityLoaderStrategy };
//# sourceMappingURL=index.esm.js.map
