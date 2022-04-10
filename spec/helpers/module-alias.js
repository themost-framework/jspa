const {addAliases} = require('module-alias');
const path = require('path');
addAliases({
    '@themost/jspa': path.resolve(process.cwd(), 'src/index'),
    '@themost/jspa/listener': path.resolve(process.cwd(), 'listener/src/index'),
    '@themost/jspa/platform-server': path.resolve(process.cwd(), 'platform-server/src/index')
});
