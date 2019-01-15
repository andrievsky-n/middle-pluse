/* Dependencies */

// utils
const gulp = require('gulp');
const del = require('del');
const fractal = require('../../fractal');

const paths = require('../../paths');

const logger = fractal.cli.console;

/* Tasks */

gulp.task('fractal:build', () => {
    const builder = fractal.web.builder();
    builder.on(
        'progress',
        (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info')
    );
    builder.on(
        'error',
        err => logger.error(err.message)
    );
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });
});

gulp.task('build:postclean', () => (
    del([
        `${paths.build}/*.html`,
        `!${paths.build}/index.html`
    ], {force: true})
));

gulp.task('build', gulp.series('compile', 'fractal:build', 'build:postclean'));
