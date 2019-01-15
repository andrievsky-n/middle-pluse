/* Dependencies */

// utils
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const errorHandler = require('gulp-plumber-error-handler');
// js
const webpack = require('webpack-stream');
const webpackConfig = require('../../webpack.config');
// paths
const paths = require('../../paths');

/* Tasks */

// scripts compilation
gulp.task('scripts', () => (
    new Promise((resolve) => {
        gulp.src(`${paths.srcScripts}/main.js`)
            .pipe(plumber({ errorHandler: errorHandler('Error in \'scripts\' task') }))
            .pipe(webpack(webpackConfig))
            .pipe(gulp.dest(paths.devScripts));
        resolve();
    })
));
