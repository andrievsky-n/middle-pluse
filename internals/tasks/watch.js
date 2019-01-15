/* Dependencies */

// utils
const gulp = require('gulp');
const argv = require('yargs').argv;
const watch = require('gulp-watch');
// paths
const paths = require('../../paths');

const isBackend = argv.b;

/* Tasks */

// start server and watching
gulp.task('watch', (done) => {
    // global.watch = true;
    watch(`${paths.srcImages}/svg/**/*.svg`, gulp.series('icons'));
    //watch(`${paths.srcImages}/**/*.*`, gulp.series('images'));
    watch(`${paths.src}/**/*.scss`, gulp.series('styles'));
    watch(`${paths.src}/**/*.conf.js`, gulp.series('data'));
    watch(`${paths.src}/public/**/*`, gulp.series('copy:public'));
    watch([
        `${paths.srcComponents}/**/*.gif`,
        `${paths.srcComponents}/**/*.jpg`,
        `${paths.srcComponents}/**/*.png`,
        `${paths.srcComponents}/**/*.svg`,
    ], gulp.series('copy:components-img'));
    watch(`${paths.srcThemes}/dw/assets/styles/**/*.scss`, gulp.series('theme:styles'));
    watch(`${paths.srcThemes}/dw/assets/img/**/*.*`, gulp.series('theme:img'));
    watch(`${paths.srcThemes}/dw/assets/fonts/**/*.*`, gulp.series('theme:fonts'));
    if (isBackend) {
        watch(`${paths.dev}/fonts/**`, gulp.series('copy:dev-fonts'));
        watch(`${paths.devImages}/**`, gulp.series('copy:dev-images'));
        watch(`${paths.devScripts}/**`, gulp.series('copy:dev-scripts'));
        watch(`${paths.devStyles}/**`, gulp.series('copy:dev-styles'));
        watch(`${paths.devThemes}/**`, gulp.series('copy:dev-themes'));
        watch([`${paths.dev}/**`, `!${paths.devAssets}/**`, `!*${paths.devThemes}/**`], gulp.series('copy:dev-public'));
        gulp.task('copy:dev')();
        done();
    } else {
        return gulp.task('fractal:serve')();
    }
});
