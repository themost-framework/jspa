'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var common = require('@themost/common');
var jspa = require('@themost/jspa');

class DefaultEntityLoaderStrategy extends jspa.EntityLoaderStrategy {
    constructor(config) {
        super(config);
        const values = config.getSourceAt('settings/jspa/imports') || [];
        common.Args.check(Array.isArray(values), new Error('Invalid configuration. The persistent annotation imports, defined by `settings/jspa/imports`, must be an array of modules.'));
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
        this.imports = values.map((item) => require(item));
    }
}

exports.DefaultEntityLoaderStrategy = DefaultEntityLoaderStrategy;
//# sourceMappingURL=index.js.map
