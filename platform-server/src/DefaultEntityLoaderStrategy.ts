import { Args, ConfigurationBase, PathUtils } from '@themost/common';
import { EntityLoaderStrategy } from '@themost/jspa';
import { TraceUtils } from '@themost/common';
class DefaultEntityLoaderStrategy extends EntityLoaderStrategy {

    constructor(config: ConfigurationBase) {
        super(config);
        const values = config.getSourceAt('settings/jspa/imports') || [];
        Args.check(Array.isArray(values), new Error('Invalid configuration. The persistent annotation imports, defined by `settings/jspa/imports`, must be an array of modules.'));
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
        this.imports = values.map((id: string) => {
            if (/^(\.\/|\..\/)/.test(id)) {
                const executionPath = config.getExecutionPath();
                if (executionPath) {
                    TraceUtils.debug(`@themost/jspa Loading persistent types from relative module "${id}"`);
                    return require(PathUtils.join(config.getExecutionPath(), id));
                }
            }
            TraceUtils.debug(`@themost/jspa Loading persistent types from module "${id}"`);
            return require(id);
        });
        // read imports
        this.readSync();
    }

    getModelDefinition(name: string): any {
        return super.getModelDefinition(name);
    }
}

export {
    DefaultEntityLoaderStrategy
}