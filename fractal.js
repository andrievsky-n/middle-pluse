'use strict';

const argv = require('yargs').argv;
const paths = require('./paths');

const isDebug = process.env.NODE_ENV !== 'production';

/*
 * Turn off bluebird warning
 * see https://github.com/frctl/fractal/issues/235#issuecomment-301077470
 */
const bluebird = require('bluebird');

bluebird.config({
    warnings: false,
});

/*
 * Require the Fractal module
 */
const fractal = require('@frctl/fractal').create();
const mandelbrot = require('@frctl/mandelbrot');

/*
 * Set name of default build page
 */
const defaultBuildPage = 'index';

/*
 * Theme settings
 */
const buildTheme = mandelbrot({
    skin: 'aqua',
    styles: ['default', '/themes/dw/styles/theme.min.css'],
    scripts: ['default', '/themes/dw/scripts/theme.js'],
});
buildTheme.addLoadPath('themes/dw/views/theme');
buildTheme.addRoute('/', {
    redirect: `components/detail/${defaultBuildPage + (!isDebug ? '.html' : '')}`
});

const devTheme = mandelbrot({
    skin: 'white'
});

if (argv.t || !isDebug) {
    fractal.web.theme(buildTheme);
} else {
    fractal.web.theme(devTheme);
}

/*
 * Give your project a title.
 */
fractal.set('project.title', 'Fractal');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.engine('@frctl/twig');
fractal.components.set('ext', '.twig');
fractal.components.set('path', `${paths.src}/components`);
fractal.components.set('default.preview', '@preview');
fractal.components.set('default.context', {
    assets: '../../assets',
    jv0: 'javascript:void(0)'
});

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', `${paths.src}/docs`);

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', paths.dev);
fractal.web.set('builder.dest', paths.build);

module.exports = fractal;
