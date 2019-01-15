/* Dependencies */

// utils
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const errorHandler = require('gulp-plumber-error-handler');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');
const changed = require('gulp-changed');
// css
const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const nano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
// js
const webpack = require('webpack-stream');
const webpackConfig = require('../../webpack-theme.config');
// paths
const paths = require('../../paths');

const isDebug = process.env.NODE_ENV !== 'production';

/* Tasks */

// theme styles compilation
gulp.task('theme:styles', () => (
    gulp.src(`${paths.srcThemes}/dw/assets/styles/theme.scss`)
        .pipe(plumber({ errorHandler: errorHandler('Error in \'styles\' task') }))
        .pipe(gulpIf(isDebug, sourcemaps.init()))
        .pipe(postcss())
        .pipe(sass({ includePaths: ['node_modules', 'src'] }))
        .pipe(gulpIf(!isDebug, autoprefixer()))
        .pipe(gulpIf(!isDebug, gcmq()))
        .pipe(gulpIf(!isDebug, nano({ zindex: false })))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulpIf(isDebug, sourcemaps.write()))
        .pipe(gulp.dest(`${paths.devThemes}/dw/styles`))
));

// theme scripts compilation
gulp.task('theme:scripts', () => {
    const dir = `${paths.devThemes}/dw/scripts`;

    return new Promise((resolve) => {
        gulp.src(`${paths.srcThemes}/dw/assets/scripts/*.js`)
            .pipe(webpack(webpackConfig))
            .pipe(changed(dir))
            .pipe(gulp.dest(dir));
        resolve();
    });
});

// copy theme images
gulp.task('theme:img', () => {
    const dir = `${paths.devThemes}/dw/images/`;

    return gulp.src(`${paths.srcThemes}/dw/assets/img/*.*`)
        .pipe(changed(dir))
        .pipe(gulp.dest(dir));
});

// copy theme fonts
gulp.task('theme:fonts', () => {
    const dir = `${paths.devThemes}/dw/fonts/`;

    return gulp.src(`${paths.srcThemes}/dw/assets/fonts/*.*`)
        .pipe(changed(dir))
        .pipe(gulp.dest(dir));
});

// common task
gulp.task('theme', gulp.parallel('theme:styles', 'theme:scripts', 'theme:img', 'theme:fonts'));
