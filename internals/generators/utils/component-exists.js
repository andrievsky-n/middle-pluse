/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const glob = require('glob');
const path = require('path');

function componentExists(comp) {
    const files = glob.sync(path.join(__dirname, `../../../src/components/**/${comp}.twig`));
    return files.length > 0;
}

module.exports = componentExists;
