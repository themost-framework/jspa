const {addAliases} = require('module-alias');
const path = require('path');
addAliases({
    '@themost/jspa': path.resolve(process.cwd(), 'src/index')
});
