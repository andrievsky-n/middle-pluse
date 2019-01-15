const path = require('path');

module.exports = {
    src: path.join(__dirname, 'src'),
    srcComponents: path.join(__dirname, 'src/components'),
    srcAssets: path.join(__dirname, 'src/public/assets'),
    srcStyles: path.join(__dirname, 'src/styles'),
    srcImages: path.join(__dirname, 'src/public/assets/images'),
    srcScripts: path.join(__dirname, 'src/scripts'),
    srcThemes: path.join(__dirname, 'themes'),
    dev: path.join(__dirname, 'dev'),
    devAssets: path.join(__dirname, 'dev/assets'),
    devStyles: path.join(__dirname, 'dev/assets/styles'),
    devImages: path.join(__dirname, 'dev/assets/images'),
    devScripts: path.join(__dirname, 'dev/assets/scripts'),
    devThemes: path.join(__dirname, 'dev/themes'),
    build: path.join(__dirname, '../build'),
    buildAssets: path.join(__dirname, '../build/assets'),
    buildStyles: path.join(__dirname, '../build/assets/styles'),
    buildImages: path.join(__dirname, '../build/assets/images'),
    buildScripts: path.join(__dirname, '../build/assets/scripts'),
    buildThemes: path.join(__dirname, '../build/themes'),
};
