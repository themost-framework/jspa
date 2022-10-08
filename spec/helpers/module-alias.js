const {addAliases} = require('module-alias');
const path = require('path');
const fs = require('fs');
const stats = fs.statSync('.module-aliases.json');
const addItems = {
    '@themost/jspa': path.resolve(process.cwd(), 'src/index'),
    '@themost/jspa/listener': path.resolve(process.cwd(), 'listener/src/index'),
    '@themost/jspa/platform-server': path.resolve(process.cwd(), 'platform-server/src/index')
};
if (stats.isFile) {
    const extraItems = JSON.parse(fs.readFileSync('.module-aliases.json', 'utf8'));
    Object.keys(extraItems).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(extraItems, key)) {
            Object.defineProperty(addItems, key, {
                configurable: true,
                enumerable: true,
                value: path.resolve(process.cwd(), extraItems[key])
            })
        }
    });
}
addAliases(addItems);
